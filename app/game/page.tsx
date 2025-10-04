"use client";

import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, RotateCcw, Trophy, Zap } from "lucide-react";
import Starfield from "@/components/starfield";

type Asteroid = {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  health: number;
};

type Bullet = {
  id: number;
  x: number;
  y: number;
};

type Explosion = {
  id: number;
  x: number;
  y: number;
  size: number;
};

type ScorePopup = {
  id: number;
  x: number;
  y: number;
  points: number;
};

export default function GamePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [playerX, setPlayerX] = useState(50);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [scorePopups, setScorePopups] = useState<ScorePopup[]>([]);
  const [canShoot, setCanShoot] = useState(true);

  const nextIdRef = useRef(0);
  const bulletIdRef = useRef(0);
  const explosionIdRef = useRef(0);
  const popupIdRef = useRef(0);
  const gameLoopRef = useRef<number>();
  const lastSpawnRef = useRef(0);
  const comboTimerRef = useRef<NodeJS.Timeout>();
  const gameStartTimeRef = useRef(0);

  useEffect(() => {
    const saved = localStorage.getItem("asteroidGameHighScore");
    if (saved) setHighScore(Number.parseInt(saved));
  }, []);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    let lastTime = performance.now();

    const gameLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      const gameTime = (currentTime - gameStartTimeRef.current) / 1000; // seconds
      const difficultyMultiplier = 1 + gameTime * 0.05; // Increases by 5% every second

      if (currentTime - lastSpawnRef.current > 800) {
        lastSpawnRef.current = currentTime;

        if (Math.random() < 0.7) {
          setAsteroids((prev) => [
            ...prev,
            {
              id: nextIdRef.current++,
              x: Math.random() * 85 + 7.5,
              y: -5,
              size: Math.random() * 25 + 25,
              speed: (Math.random() * 0.4 + 0.8) * difficultyMultiplier,
              health: 1,
            },
          ]);
        }
      }

      setAsteroids((prev) => {
        const updated = prev
          .map((ast) => ({
            ...ast,
            y: ast.y + ast.speed * (deltaTime / 16),
          }))
          .filter((ast) => ast.y < 105);

        updated.forEach((ast) => {
          const distance = Math.sqrt(
            Math.pow(ast.x - playerX, 2) + Math.pow(ast.y - 90, 2)
          );
          if (distance < ast.size / 2 + 3) {
            setGameOver(true);
            if (score > highScore) {
              setHighScore(score);
              localStorage.setItem("asteroidGameHighScore", score.toString());
            }
          }
        });

        return updated;
      });

      setBullets((prevBullets) => {
        const updatedBullets = prevBullets
          .map((bullet) => ({
            ...bullet,
            y: bullet.y - 4 * (deltaTime / 16),
          }))
          .filter((bullet) => bullet.y > -5);

        const bulletsToRemove: number[] = [];

        setAsteroids((prevAsteroids) => {
          const asteroidsToRemove: number[] = [];

          prevAsteroids.forEach((ast) => {
            updatedBullets.forEach((bullet) => {
              const distance = Math.sqrt(
                Math.pow(ast.x - bullet.x, 2) + Math.pow(ast.y - bullet.y, 2)
              );
              if (distance < ast.size / 2 + 2) {
                asteroidsToRemove.push(ast.id);
                bulletsToRemove.push(bullet.id);

                setExplosions((prev) => [
                  ...prev,
                  {
                    id: explosionIdRef.current++,
                    x: ast.x,
                    y: ast.y,
                    size: ast.size,
                  },
                ]);

                const points = 10 * (combo + 1);
                setScore((s) => s + points);
                setCombo((c) => c + 1);

                setScorePopups((prev) => [
                  ...prev,
                  {
                    id: popupIdRef.current++,
                    x: ast.x,
                    y: ast.y,
                    points,
                  },
                ]);

                if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
                comboTimerRef.current = setTimeout(() => setCombo(0), 2000);

                setTimeout(() => {
                  setExplosions((prev) =>
                    prev.filter((exp) => exp.id !== explosionIdRef.current - 1)
                  );
                }, 500);

                setTimeout(() => {
                  setScorePopups((prev) =>
                    prev.filter((popup) => popup.id !== popupIdRef.current - 1)
                  );
                }, 1000);
              }
            });
          });

          return prevAsteroids.filter(
            (ast) => !asteroidsToRemove.includes(ast.id)
          );
        });

        return updatedBullets.filter(
          (bullet) => !bulletsToRemove.includes(bullet.id)
        );
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
    };
  }, [gameStarted, gameOver, playerX, score, highScore, combo]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!gameStarted || gameOver) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setPlayerX(Math.max(5, Math.min(95, x)));
    },
    [gameStarted, gameOver]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!gameStarted || gameOver) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const touch = e.touches[0];
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      setPlayerX(Math.max(5, Math.min(95, x)));
    },
    [gameStarted, gameOver]
  );

  const shoot = useCallback(() => {
    if (!gameStarted || gameOver || !canShoot) return;

    setBullets((prev) => [
      ...prev,
      {
        id: bulletIdRef.current++,
        x: playerX,
        y: 85,
      },
    ]);

    setCanShoot(false);
    setTimeout(() => setCanShoot(true), 200); // 200ms cooldown
  }, [gameStarted, gameOver, playerX, canShoot]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        shoot();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [shoot]);

  const handleClick = useCallback(() => {
    shoot();
  }, [shoot]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCombo(0);
    setPlayerX(50);
    setAsteroids([]);
    setBullets([]);
    setExplosions([]);
    setScorePopups([]);
    nextIdRef.current = 0;
    bulletIdRef.current = 0;
    explosionIdRef.current = 0;
    popupIdRef.current = 0;
    lastSpawnRef.current = 0;
    gameStartTimeRef.current = performance.now();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 text-foreground relative overflow-hidden">
      <Starfield />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-md bg-background/80">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Home className="h-5 w-5" />
                <span className="font-semibold">Home</span>
              </Link>
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="text-muted-foreground">High Score: </span>
                  <span className="text-accent font-bold">{highScore}</span>
                </div>
                <Link href="/quiz">
                  <Button variant="outline" size="sm">
                    Take Quiz
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Title */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-accent">
                Meteor Blaster
              </h1>
              <p className="text-xl text-muted-foreground">
                Shoot down incoming meteors and rack up combos!
              </p>
            </div>

            {/* Game Area */}
            <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-b from-card/50 to-card/80 backdrop-blur-sm">
              <div
                className="relative w-full aspect-[3/4] md:aspect-[4/3] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 cursor-crosshair"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onClick={handleClick}
              >
                {/* Score Display */}
                {gameStarted && !gameOver && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                    <div className="px-6 py-3 bg-primary/20 backdrop-blur-md border-2 border-primary/50 rounded-full">
                      <span className="text-2xl font-bold text-primary">
                        {score}
                      </span>
                    </div>
                    {combo > 0 && (
                      <div className="px-4 py-2 bg-accent/20 backdrop-blur-md border-2 border-accent/50 rounded-full animate-bounce-in">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-accent" />
                          <span className="text-sm font-bold text-accent">
                            x{combo + 1} COMBO!
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Score Popups */}
                {scorePopups.map((popup) => (
                  <div
                    key={popup.id}
                    className="absolute z-30 pointer-events-none animate-float-up"
                    style={{
                      left: `${popup.x}%`,
                      top: `${popup.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <span className="text-2xl font-bold text-accent drop-shadow-lg">
                      +{popup.points}
                    </span>
                  </div>
                ))}

                {/* Explosions */}
                {explosions.map((exp) => (
                  <div
                    key={exp.id}
                    className="absolute z-20 pointer-events-none"
                    style={{
                      left: `${exp.x}%`,
                      top: `${exp.y}%`,
                      width: `${exp.size * 1.5}px`,
                      height: `${exp.size * 1.5}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-accent via-secondary to-transparent animate-explosion opacity-0" />
                  </div>
                ))}

                {/* Asteroids */}
                {asteroids.map((ast) => (
                  <div
                    key={ast.id}
                    className="absolute"
                    style={{
                      left: `${ast.x}%`,
                      top: `${ast.y}%`,
                      width: `${ast.size}px`,
                      height: `${ast.size}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full bg-white shadow-lg shadow-white/30"
                      style={{ animation: "spin 3s linear infinite" }}
                    />
                  </div>
                ))}

                {/* Bullets */}
                {bullets.map((bullet) => (
                  <div
                    key={bullet.id}
                    className="absolute z-10"
                    style={{
                      left: `${bullet.x}%`,
                      top: `${bullet.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="w-2 h-4 bg-gradient-to-t from-primary to-cyan-300 rounded-full shadow-lg shadow-primary/50" />
                  </div>
                ))}

                {/* Player Spaceship */}
                {gameStarted && !gameOver && (
                  <div
                    className="absolute bottom-[10%] z-10 transition-all duration-75"
                    style={{
                      left: `${playerX}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="relative">
                      <div className="text-4xl">🚀</div>
                      {!canShoot && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary/30 rounded-full overflow-hidden">
                          <div className="h-full bg-primary animate-reload-bar" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Start Screen */}
                {!gameStarted && !gameOver && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm">
                    <div className="text-center space-y-6 p-8 max-w-lg">
                      <div className="text-6xl animate-bounce-in">🚀</div>
                      <h3 className="text-2xl font-bold">Ready to Blast?</h3>
                      <div className="space-y-3 text-muted-foreground">
                        <p className="flex items-center justify-center gap-2">
                          <span className="text-primary font-bold">Move:</span>{" "}
                          Mouse or touch to aim
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <span className="text-primary font-bold">Shoot:</span>{" "}
                          Click, tap, or press SPACE
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <span className="text-accent font-bold">Combo:</span>{" "}
                          Hit multiple meteors in a row!
                        </p>
                      </div>
                      <Button
                        size="lg"
                        onClick={startGame}
                        className="gradient-primary text-white text-lg px-8 py-6"
                      >
                        Start Game
                      </Button>
                    </div>
                  </div>
                )}

                {/* Game Over Screen */}
                {gameOver && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm animate-bounce-in">
                    <div className="text-center space-y-6 p-8">
                      <div className="text-6xl animate-shake">💥</div>
                      <h3 className="text-3xl font-bold text-destructive">
                        Game Over!
                      </h3>
                      <div className="space-y-2">
                        <p className="text-xl">
                          <span className="text-muted-foreground">
                            Final Score:{" "}
                          </span>
                          <span className="text-primary font-bold text-2xl">
                            {score}
                          </span>
                        </p>
                        {score === highScore && score > 0 && (
                          <div className="flex items-center justify-center gap-2 text-accent animate-bounce-in">
                            <Trophy className="h-5 w-5" />
                            <span className="font-bold">New High Score!</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-4 justify-center flex-wrap">
                        <Button
                          size="lg"
                          onClick={startGame}
                          className="gradient-secondary text-white"
                        >
                          <RotateCcw className="mr-2 h-5 w-5" />
                          Play Again
                        </Button>
                        <Link href="/quiz">
                          <Button size="lg" variant="outline">
                            Take Quiz
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Instructions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 bg-primary/10 border-primary/30 text-center hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-bold mb-1">Aim & Shoot</h4>
                <p className="text-sm text-muted-foreground">
                  Click or press SPACE to fire
                </p>
              </Card>
              <Card className="p-4 bg-accent/10 border-accent/30 text-center hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-bold mb-1">Build Combos</h4>
                <p className="text-sm text-muted-foreground">
                  Hit meteors rapidly for bonus points
                </p>
              </Card>
              <Card className="p-4 bg-secondary/10 border-secondary/30 text-center hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">🏆</div>
                <h4 className="font-bold mb-1">High Score</h4>
                <p className="text-sm text-muted-foreground">
                  Survive and score as much as you can
                </p>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

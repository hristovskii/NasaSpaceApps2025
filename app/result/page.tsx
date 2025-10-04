"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  RotateCcw,
  Home,
  Sparkles,
  Target,
  Zap,
  BookOpen,
} from "lucide-react";
import Starfield from "@/components/starfield";

export default function ResultPage() {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedScore = localStorage.getItem("quizScore");
    const storedTotal = localStorage.getItem("quizTotal");

    if (storedScore && storedTotal) {
      setScore(Number.parseInt(storedScore));
      setTotalQuestions(Number.parseInt(storedTotal));
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const percentage = Math.round((score / totalQuestions) * 100);

  const getPerformanceData = () => {
    if (percentage >= 80) {
      return {
        title: "Asteroid Expert!",
        emoji: "🏆",
        message:
          "Outstanding! You have excellent knowledge of asteroid impacts and planetary defense.",
        color: "from-success to-success/70",
        textColor: "text-success",
      };
    } else if (percentage >= 60) {
      return {
        title: "Space Cadet",
        emoji: "🚀",
        message:
          "Great job! You have a solid understanding of asteroid science.",
        color: "from-primary to-primary/70",
        textColor: "text-primary",
      };
    } else if (percentage >= 40) {
      return {
        title: "Asteroid Apprentice",
        emoji: "🌟",
        message: "Good effort! Keep learning about these cosmic threats.",
        color: "from-secondary to-secondary/70",
        textColor: "text-blue-500",
      };
    } else {
      return {
        title: "Space Rookie",
        emoji: "🌠",
        message:
          "Don't worry! Every expert started somewhere. Try again to improve your score!",
        color: "from-accent to-accent/70",
        textColor: "text-success",
      };
    }
  };

  const performance = getPerformanceData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 text-foreground relative overflow-hidden">
      <Starfield />

      <div className="relative z-10">
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
              <div className="flex gap-3">
                <Link href="/learn">
                  <Button variant="outline" size="sm">
                    Learn
                  </Button>
                </Link>
                <Link href="/game">
                  <Button variant="outline" size="sm">
                    Game
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <Card className="p-8 md:p-12 bg-card/90 backdrop-blur-sm border-2 border-primary/30 shadow-xl text-center animate-bounce-in">
              <div className="space-y-6">
                <div className="text-8xl mb-4 animate-float">
                  {performance.emoji}
                </div>

                <div>
                  <h1
                    className={`text-4xl md:text-5xl font-black mb-3 ${performance.textColor}`}
                  >
                    {performance.title}
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-md mx-auto">
                    {performance.message}
                  </p>
                </div>

                <div className="py-8">
                  <div className="text-7xl md:text-8xl font-black mb-4">
                    <span className={performance.textColor}>{score}</span>
                    <span className="text-muted-foreground">
                      /{totalQuestions}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-4 mb-3" />
                  <p className="text-2xl font-bold text-muted-foreground">
                    {percentage}% Correct
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/40 text-center hover:scale-105 transition-transform">
                <Trophy className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-black text-primary mb-1">
                  {score}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Correct Answers
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary/40 text-center hover:scale-105 transition-transform">
                <Target className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                <div className="text-3xl font-black text-blue-500 mb-1">
                  {percentage}%
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Accuracy
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/40 text-center hover:scale-105 transition-transform">
                <Zap className="h-10 w-10 text-success mx-auto mb-3" />
                <div className="text-3xl font-black text-success mb-1">
                  {totalQuestions}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Total Questions
                </div>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Button
                onClick={() => router.push("/quiz")}
                size="lg"
                className="gradient-primary text-white text-lg py-6 hover:scale-105 transition-transform shadow-lg"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Retake Quiz
              </Button>

              <Link href="/learn" className="block">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full text-lg py-6 hover:scale-105 transition-transform border-2 bg-transparent"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Learn More
                </Button>
              </Link>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30">
              <div className="flex items-start gap-4">
                <Sparkles className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">
                    Want to explore more?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Try our interactive impact simulator to see what would
                    happen if an asteroid hit Earth!
                  </p>
                  <Link href="/simulator">
                    <Button
                      variant="outline"
                      className="hover:scale-105 transition-transform bg-transparent"
                    >
                      Open Simulator
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

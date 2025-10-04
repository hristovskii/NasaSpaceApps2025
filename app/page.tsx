import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, Zap, BookOpen, Gamepad2, Sparkles } from "lucide-react";
import Starfield from "@/components/starfield";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 text-foreground relative overflow-hidden">
      <Starfield />

      <div className="relative z-10">
        <header className="border-b border-border/50 backdrop-blur-md bg-background/80">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Zap className="h-7 w-7 text-primary animate-pulse-glow" />
                  <Sparkles className="h-4 w-4 text-secondary absolute -top-1 -right-1" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">
                  Meteor Madness
                </h1>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/learn"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Learn
                </Link>
                <Link
                  href="/quiz"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Quiz
                </Link>
                <Link
                  href="/game"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Game
                </Link>
                <Link
                  href="/simulator"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Simulator
                </Link>
                <Link
                  href="/credits"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Credits
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <div className="space-y-6 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border border-primary/30 rounded-full text-sm font-semibold mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-primary">
                  NASA Space Apps Challenge 2024
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-balance leading-tight">
                <span className="text-primary">Explore the Universe</span>
                <br />
                <span className="text-foreground">of Asteroid Science</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
                Dive into an interactive journey through space! Learn about
                near-Earth objects, test your cosmic knowledge, defend Earth
                from asteroids, and simulate real impact scenarios—all powered
                by <span className="text-blue-500 font-bold">NASA data</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/quiz">
                <Button
                  size="lg"
                  className="text-lg px-10 py-7 gradient-primary text-white hover:scale-105 transition-transform shadow-lg hover:shadow-primary/50"
                >
                  <Rocket className="mr-2 h-6 w-6" />
                  Start Quiz
                </Button>
              </Link>
              <Link href="/game">
                <Button
                  size="lg"
                  className="text-lg px-10 py-7 gradient-secondary text-white hover:scale-105 transition-transform shadow-lg hover:shadow-secondary/50"
                >
                  <Gamepad2 className="mr-2 h-6 w-6" />
                  Play Game
                </Button>
              </Link>
              <Link href="/learn">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-7 border-2 border-primary/50 hover:bg-primary/10 hover:scale-105 transition-all bg-transparent"
                >
                  <BookOpen className="mr-2 h-6 w-6" />
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 pt-12">
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-success/20 hover:border-success/50 hover:scale-105 hover:shadow-xl hover:shadow-success/20 transition-all duration-300 cursor-pointer group">
                <div className="text-5xl mb-4 group-hover:animate-float">
                  🌍
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary">Learn</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Discover 15 fascinating facts about asteroids and planetary
                  defense
                </p>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-success/20 hover:border-success/50 hover:scale-105 hover:shadow-xl hover:shadow-success/20 transition-all duration-300 cursor-pointer group">
                <div className="text-5xl mb-4 group-hover:animate-bounce-in">
                  🧠
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary">Quiz</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Challenge yourself with 10 questions about space rocks and
                  impacts
                </p>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-success/20 hover:border-success/50 hover:scale-105 hover:shadow-xl hover:shadow-success/20 transition-all duration-300 cursor-pointer group">
                <div className="text-5xl mb-4 group-hover:animate-bounce">
                  🎮
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary">Play</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Shoot down asteroids in our action-packed space shooter game
                </p>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-success/20 hover:border-success/50 hover:scale-105 hover:shadow-xl hover:shadow-success/20 transition-all duration-300 cursor-pointer group">
                <div className="text-5xl mb-4 group-hover:animate-pulse">
                  💥
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary">
                  Simulate
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Calculate real impact energy, crater size, and global effects
                </p>
              </Card>
            </div>

            <div className="pt-12">
              <h3 className="text-3xl font-bold mb-8 text-foreground">
                Why Meteor Madness?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">📚</div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">
                    Real NASA Data
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All information is based on actual NASA research and data
                    from CNEOS and PDCO
                  </p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/30 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🎯</div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">
                    Interactive Learning
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Engage with content through quizzes, games, and simulations
                    for better retention
                  </p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🚀</div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">
                    Planetary Defense
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Learn how scientists protect Earth from potential asteroid
                    threats
                  </p>
                </Card>
              </div>
            </div>

            <div className="pt-12 max-w-3xl mx-auto">
              <Card className="p-8 bg-gradient-to-br from-accent/10 via-secondary/10 to-primary/10 border-2 border-accent/30 backdrop-blur-sm hover:shadow-2xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-4xl animate-rotate-slow">☄️</div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">
                      About Impactor-2025
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-balance">
                      Impactor-2025 is a fictional asteroid used for educational
                      purposes. While not real, it represents the type of
                      near-Earth objects that scientists monitor daily.
                      Understanding asteroid impacts helps us prepare for
                      planetary defense and appreciate the importance of space
                      science.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 mt-20 backdrop-blur-sm bg-background/50">
          <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Created for NASA Space Apps Challenge 2025 • Hosted at Base42,
              Skopje, Macedonia
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <Link
                href="/learn"
                className="hover:text-primary transition-colors"
              >
                Learn
              </Link>
              <Link
                href="/quiz"
                className="hover:text-primary transition-colors"
              >
                Quiz
              </Link>
              <Link
                href="/game"
                className="hover:text-primary transition-colors"
              >
                Game
              </Link>
              <Link
                href="/simulator"
                className="hover:text-primary transition-colors"
              >
                Simulator
              </Link>
              <Link
                href="/credits"
                className="hover:text-primary transition-colors"
              >
                Credits
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

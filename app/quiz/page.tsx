"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Home,
  Zap,
  Trophy,
} from "lucide-react";
import Starfield from "@/components/starfield";

const questions = [
  {
    question:
      "What is the approximate diameter of the asteroid that caused the extinction of the dinosaurs?",
    options: [
      "1 kilometer",
      "10 kilometers",
      "50 kilometers",
      "100 kilometers",
    ],
    correct: 1,
    explanation:
      "The Chicxulub impactor was approximately 10 kilometers in diameter. This massive asteroid struck Earth about 66 million years ago, causing the extinction of the dinosaurs.",
  },
  {
    question:
      "Which method is considered most effective for deflecting an asteroid years before impact?",
    options: [
      "Nuclear explosion on the surface",
      "Kinetic impactor (ramming it)",
      "Painting it white",
      "Laser ablation",
    ],
    correct: 1,
    explanation:
      "A kinetic impactor, which involves ramming a spacecraft into the asteroid, is currently the most practical method. NASA's DART mission successfully demonstrated this technique in 2022.",
  },
  {
    question:
      "How much energy would a 1 km asteroid traveling at 20 km/s release upon impact?",
    options: [
      "Equivalent to 1 megaton of TNT",
      "Equivalent to 100 megatons of TNT",
      "Equivalent to 10,000 megatons of TNT",
      "Equivalent to 1 million megatons of TNT",
    ],
    correct: 3,
    explanation:
      "A 1 km asteroid at 20 km/s would release approximately 1 million megatons of TNT equivalent energy—enough to cause global climate effects and mass extinctions.",
  },
  {
    question:
      "What is the name of NASA's planetary defense coordination office?",
    options: [
      "Near-Earth Object Program",
      "Planetary Defense Coordination Office (PDCO)",
      "Asteroid Watch Division",
      "Space Guard Center",
    ],
    correct: 1,
    explanation:
      "NASA's Planetary Defense Coordination Office (PDCO) is responsible for detecting, tracking, and characterizing potentially hazardous asteroids and comets.",
  },
  {
    question:
      "An asteroid impact in the ocean would primarily cause damage through:",
    options: [
      "Boiling all the water",
      "Creating massive tsunamis",
      "Releasing toxic gases",
      "Freezing the ocean",
    ],
    correct: 1,
    explanation:
      "Ocean impacts generate massive tsunamis that can devastate coastal regions thousands of kilometers away. The impact energy displaces enormous volumes of water.",
  },
  {
    question:
      "What percentage of near-Earth asteroids larger than 1 km have been discovered?",
    options: ["About 50%", "About 75%", "About 95%", "100%"],
    correct: 2,
    explanation:
      "NASA estimates that over 95% of near-Earth asteroids larger than 1 kilometer have been found. None of these currently pose a threat to Earth in the foreseeable future.",
  },
  {
    question:
      "What was the size of the asteroid that exploded over Chelyabinsk, Russia in 2013?",
    options: ["5 meters", "20 meters", "50 meters", "100 meters"],
    correct: 1,
    explanation:
      "The Chelyabinsk meteor was about 20 meters in diameter. It exploded in the atmosphere with the energy of about 500 kilotons of TNT, injuring over 1,500 people from shattered glass.",
  },
  {
    question:
      "How long would we ideally need to deflect a large asteroid heading toward Earth?",
    options: ["1 month", "1 year", "10 years", "100 years"],
    correct: 2,
    explanation:
      "Ideally, we would need at least 10 years of warning to successfully deflect a large asteroid. The earlier we detect it, the smaller the deflection needed and the higher the chance of success.",
  },
  {
    question: "What is the main composition of most asteroids?",
    options: [
      "Ice and frozen gases",
      "Rock and metal",
      "Pure iron",
      "Organic compounds",
    ],
    correct: 1,
    explanation:
      "Most asteroids are composed of rock and metal. There are three main types: C-type (carbonaceous), S-type (silicate), and M-type (metallic), with C-type being the most common.",
  },
  {
    question:
      "What is a 'gravity tractor' in the context of asteroid deflection?",
    options: [
      "A large magnet that pulls asteroids",
      "A spacecraft that uses its gravity to slowly pull an asteroid off course",
      "A ground-based laser system",
      "A nuclear-powered rocket",
    ],
    correct: 1,
    explanation:
      "A gravity tractor is a theoretical spacecraft that would fly alongside an asteroid for years, using its own gravitational pull to gradually alter the asteroid's trajectory without touching it.",
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isCorrect = selectedAnswer === questions[currentQuestion].correct;

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      localStorage.setItem("quizScore", score.toString());
      localStorage.setItem("quizTotal", questions.length.toString());
      router.push("/result");
    }
  };

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
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-primary">
                    {score}/{questions.length}
                  </span>
                </div>
                {streak > 1 && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-full animate-bounce-in">
                    <Zap className="h-4 w-4 text-success" />
                    <span className="text-sm font-bold text-success">
                      {streak} Streak!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-primary font-bold">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-3 animate-slide-up" />
            </div>

            <Card className="p-6 md:p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/30 shadow-xl hover:shadow-2xl transition-shadow animate-slide-up">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-balance leading-tight">
                {questions[currentQuestion].question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectAnswer =
                    index === questions[currentQuestion].correct;

                  let buttonClass =
                    "w-full justify-start text-left h-auto py-5 px-6 text-base font-medium transition-all duration-300";

                  if (showFeedback) {
                    if (isCorrectAnswer) {
                      buttonClass +=
                        " gradient-success text-white border-success shadow-lg shadow-success/30 scale-105";
                    } else if (isSelected && !isCorrect) {
                      buttonClass +=
                        " bg-destructive/20 border-destructive text-destructive-foreground animate-shake";
                    } else {
                      buttonClass += " opacity-40";
                    }
                  } else {
                    buttonClass += isSelected
                      ? " bg-primary/20 border-primary/60 border-2 scale-105 shadow-lg"
                      : " border-border/50 hover:bg-muted hover:border-primary/30 hover:scale-102";
                  }

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={buttonClass}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showFeedback}
                    >
                      <span className="flex items-center gap-4 w-full">
                        <span
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                            showFeedback && isCorrectAnswer
                              ? "bg-white text-success"
                              : showFeedback && isSelected && !isCorrect
                              ? "bg-destructive/30 text-destructive"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1 text-pretty">{option}</span>
                        {showFeedback && isCorrectAnswer && (
                          <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0 animate-bounce-in" />
                        )}
                        {showFeedback && isSelected && !isCorrect && (
                          <XCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                        )}
                      </span>
                    </Button>
                  );
                })}
              </div>

              {showFeedback && (
                <div
                  className={`mt-8 p-6 rounded-xl border-2 animate-bounce-in ${
                    isCorrect
                      ? "bg-gradient-to-r from-success/20 to-success/10 border-success/40"
                      : "bg-gradient-to-r from-accent/20 to-accent/10 border-accent/40"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {isCorrect ? (
                      <CheckCircle2 className="h-8 w-8 text-success flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-8 w-8 text-success flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold text-lg mb-2">
                        {isCorrect ? "Correct! 🎉" : "Not quite! 🤔"}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {questions[currentQuestion].explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Next Button */}
              {showFeedback && (
                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="gradient-primary text-white text-lg px-8 py-6 hover:scale-105 transition-transform shadow-lg"
                  >
                    {currentQuestion < questions.length - 1 ? (
                      <>
                        Next Question
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    ) : (
                      <>
                        View Results
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

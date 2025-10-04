"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ChevronDown, ChevronUp } from "lucide-react";
import Starfield from "@/components/starfield";

const asteroidFacts = [
  {
    id: 1,
    emoji: "🌍",
    question: "What is a Near-Earth Object (NEO)?",
    answer:
      "Near-Earth Objects are asteroids or comets with orbits that bring them within 1.3 astronomical units (AU) of the Sun, meaning they can pass relatively close to Earth's orbit. NASA's Center for Near-Earth Object Studies (CNEOS) tracks over 30,000 NEOs. Most are harmless, but understanding their trajectories is crucial for planetary defense.",
    color: "primary",
  },
  {
    id: 2,
    emoji: "💥",
    question: "What was the Chicxulub Impact?",
    answer:
      "66 million years ago, a 10-kilometer asteroid struck the Yucatán Peninsula in Mexico, creating the 180-kilometer-wide Chicxulub crater. The impact released energy equivalent to 10 billion Hiroshima bombs, causing global wildfires, tsunamis, and an 'impact winter' that led to the extinction of 75% of Earth's species, including non-avian dinosaurs.",
    color: "secondary",
  },
  {
    id: 3,
    emoji: "🚀",
    question: "What is NASA's DART Mission?",
    answer:
      "The Double Asteroid Redirection Test (DART) was NASA's first planetary defense test mission. In September 2022, DART successfully crashed into Dimorphos, a moonlet orbiting the asteroid Didymos, changing its orbital period by 33 minutes. This proved that kinetic impactor technology can deflect asteroids, providing a viable defense method.",
    color: "accent",
  },
  {
    id: 4,
    emoji: "🔭",
    question: "How do we detect asteroids?",
    answer:
      "Astronomers use ground-based telescopes and space observatories to detect asteroids. NASA's Catalina Sky Survey, Pan-STARRS, and the upcoming NEO Surveyor space telescope scan the sky nightly. When an asteroid is discovered, its orbit is calculated using multiple observations. Potentially Hazardous Asteroids (PHAs) are those larger than 140 meters that come within 0.05 AU of Earth.",
    color: "success",
  },
  {
    id: 5,
    emoji: "⚡",
    question: "What is the Torino Scale?",
    answer:
      "The Torino Scale is a method for categorizing asteroid impact hazards from 0 (no hazard) to 10 (certain collision causing global catastrophe). It considers both collision probability and kinetic energy. Currently, all known asteroids are rated 0 or 1. The scale helps communicate risk to the public without causing unnecessary alarm.",
    color: "primary",
  },
  {
    id: 6,
    emoji: "🌠",
    question: "What happened in Tunguska, 1908?",
    answer:
      "On June 30, 1908, a 50-60 meter asteroid or comet exploded over Siberia's Tunguska region at an altitude of 5-10 km. The airburst released energy equivalent to 10-15 megatons of TNT, flattening 2,000 square kilometers of forest and knocking down an estimated 80 million trees. Fortunately, the remote location meant no confirmed human casualties.",
    color: "secondary",
  },
  {
    id: 7,
    emoji: "🛡️",
    question: "What is Planetary Defense?",
    answer:
      "Planetary defense involves detecting, tracking, and potentially deflecting asteroids that threaten Earth. NASA's Planetary Defense Coordination Office (PDCO) leads these efforts. Deflection methods include kinetic impactors (like DART), gravity tractors, and as a last resort, nuclear devices. Early detection is key—decades of warning time makes deflection much easier.",
    color: "accent",
  },
  {
    id: 8,
    emoji: "📊",
    question: "How often do asteroids hit Earth?",
    answer:
      "Small asteroids (1-20 meters) enter Earth's atmosphere about once a year but usually burn up. Tunguska-sized events (50+ meters) occur every few centuries. Dinosaur-killer impacts (10+ km) happen roughly every 100 million years. NASA estimates we've found over 95% of near-Earth asteroids larger than 1 km, and none currently pose a threat.",
    color: "success",
  },
  {
    id: 9,
    emoji: "🌌",
    question: "What is the Asteroid Belt?",
    answer:
      "The Asteroid Belt is a region between Mars and Jupiter containing millions of rocky objects. Despite popular depictions, asteroids are widely spaced—spacecraft can traverse it safely. The belt contains about 4% of the Moon's mass. Ceres, the largest object, is 940 km in diameter. Most near-Earth asteroids originated from the belt, ejected by Jupiter's gravity.",
    color: "primary",
  },
  {
    id: 10,
    emoji: "💎",
    question: "Are asteroids valuable?",
    answer:
      "Asteroids contain vast mineral wealth. A single metallic asteroid like 16 Psyche may contain $10 quintillion worth of iron, nickel, and precious metals. Water-rich asteroids could provide fuel for deep space missions. While asteroid mining remains theoretical, companies and space agencies are developing technologies for future resource extraction.",
    color: "secondary",
  },
  {
    id: 11,
    emoji: "🌡️",
    question: "What is an 'impact winter'?",
    answer:
      "An impact winter occurs when a large asteroid impact throws massive amounts of dust and debris into the atmosphere, blocking sunlight for months or years. This causes global temperatures to plummet, disrupting photosynthesis and food chains. The Chicxulub impact caused an impact winter that contributed to the mass extinction 66 million years ago.",
    color: "accent",
  },
  {
    id: 12,
    emoji: "🎯",
    question: "What makes an asteroid 'potentially hazardous'?",
    answer:
      "A Potentially Hazardous Asteroid (PHA) is defined as an asteroid larger than 140 meters in diameter that comes within 0.05 AU (about 7.5 million kilometers) of Earth's orbit. There are currently over 2,300 known PHAs. Being classified as potentially hazardous doesn't mean an impact is imminent—it just means we monitor them closely.",
    color: "success",
  },
  {
    id: 13,
    emoji: "🔬",
    question: "What was the Chelyabinsk meteor event?",
    answer:
      "On February 15, 2013, a 20-meter asteroid entered Earth's atmosphere over Chelyabinsk, Russia, exploding at an altitude of 30 km with the energy of about 500 kilotons of TNT. The shockwave damaged thousands of buildings and injured over 1,500 people from shattered glass. It was the largest asteroid impact since Tunguska and highlighted the need for better detection systems.",
    color: "primary",
  },
  {
    id: 14,
    emoji: "🛰️",
    question: "What is the NEO Surveyor mission?",
    answer:
      "NEO Surveyor is NASA's upcoming space telescope dedicated to finding potentially hazardous asteroids. Launching in 2027, it will use infrared sensors to detect asteroids that are difficult to spot from Earth. The mission aims to find 90% of near-Earth asteroids larger than 140 meters within a decade, significantly improving our planetary defense capabilities.",
    color: "secondary",
  },
  {
    id: 15,
    emoji: "⚛️",
    question: "Could we use nuclear weapons to deflect asteroids?",
    answer:
      "Nuclear devices are considered a last-resort option for asteroid deflection. Rather than blowing up the asteroid (which could create multiple dangerous fragments), a nuclear explosion near the surface could vaporize material and create thrust to push it off course. This method would only be used if we had very short warning time and other methods weren't feasible.",
    color: "accent",
  },
];

export default function LearnPage() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setOpenCard(openCard === id ? null : id);
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
              <div className="flex gap-3">
                <Link href="/quiz">
                  <Button variant="outline" size="sm">
                    Take Quiz
                  </Button>
                </Link>
                <Link href="/game">
                  <Button variant="outline" size="sm">
                    Play Game
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Title */}
            <div className="text-center space-y-4 animate-slide-up">
              <h1 className="text-4xl md:text-6xl font-black text-balance text-primary">
                Learn About Asteroids
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                Explore fascinating facts about asteroids, impacts, and
                planetary defense with real NASA data
              </p>
            </div>

            <div className="space-y-4 pt-8">
              {asteroidFacts.map((fact, index) => {
                const isOpen = openCard === fact.id;
                return (
                  <Card
                    key={fact.id}
                    className={`overflow-hidden border-2 transition-all duration-300 cursor-pointer  ${
                      isOpen ? "shadow-xl" : "hover:shadow-lg"
                    }`}
                    onClick={() => toggleCard(fact.id)}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className={`text-4xl ${
                              isOpen ? "animate-bounce-in" : ""
                            }`}
                          >
                            {fact.emoji}
                          </div>
                          <h3 className="font-bold text-lg md:text-xl text-balance">
                            {fact.question}
                          </h3>
                        </div>
                        <div
                          className={`transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          {isOpen ? (
                            <ChevronUp className="h-6 w-6 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                      </div>

                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-border/50 animate-slide-up">
                          <p className="text-muted-foreground leading-relaxed">
                            {fact.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="pt-12">
              <Card className="p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Test Your Knowledge?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Now that you've learned about asteroids, take our quiz to see
                  how much you remember!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/quiz">
                    <Button size="lg" className="gradient-primary text-white">
                      Take the Quiz
                    </Button>
                  </Link>
                  <Link href="/game">
                    <Button size="lg" className="gradient-secondary text-white">
                      Play the Game
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

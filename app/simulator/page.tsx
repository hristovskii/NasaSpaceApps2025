"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Home, RotateCcw, Sparkles } from "lucide-react";
import Starfield from "@/components/starfield";

type Size = "small" | "medium" | "large";
type Velocity = "slow" | "medium" | "fast";
type Location = "ocean" | "city" | "desert";

export default function SimulatorPage() {
  const [size, setSize] = useState<Size>("medium");
  const [velocity, setVelocity] = useState<Velocity>("medium");
  const [location, setLocation] = useState<Location>("city");
  const [showResults, setShowResults] = useState(false);

  const calculateImpact = () => {
    const sizeMultiplier = { small: 1, medium: 10, large: 100 };
    const velocityMultiplier = { slow: 1, medium: 4, fast: 16 };

    const baseEnergy = 100;
    const energy =
      baseEnergy * sizeMultiplier[size] * velocityMultiplier[velocity];

    const baseCrater = 1;
    const craterSize =
      baseCrater *
      Math.sqrt(sizeMultiplier[size]) *
      Math.sqrt(velocityMultiplier[velocity]);

    return { energy, craterSize };
  };

  const getConsequences = () => {
    const { energy } = calculateImpact();

    const consequences = [];

    if (location === "ocean") {
      consequences.push(
        "🌊 Massive tsunamis reaching heights of " +
          (energy > 1000 ? "100+ meters" : "50+ meters")
      );
      consequences.push("🏖️ Coastal devastation for thousands of kilometers");
      consequences.push(
        "💨 Atmospheric water vapor injection causing climate effects"
      );
    } else if (location === "city") {
      consequences.push("🏙️ Complete destruction of the impact zone");
      consequences.push(
        "🔥 Firestorms extending " +
          (energy > 1000 ? "500+ km" : "200+ km") +
          " from impact"
      );
      consequences.push(
        "💀 Millions of casualties from blast and thermal radiation"
      );
      consequences.push("🌫️ Dust and debris blocking sunlight for months");
    } else {
      consequences.push("🏜️ Massive crater formation and ground shaking");
      consequences.push("💨 Dust clouds affecting regional climate");
      consequences.push("🌍 Seismic waves felt globally");
    }

    if (energy > 10000) {
      consequences.push('❄️ Global "impact winter" lasting years');
      consequences.push("🌾 Worldwide crop failures and famine");
      consequences.push("🦕 Potential mass extinction event");
    } else if (energy > 1000) {
      consequences.push("🌡️ Regional climate disruption");
      consequences.push("🌾 Agricultural damage across continents");
    }

    return consequences;
  };

  const getSeverityColor = () => {
    const { energy } = calculateImpact();
    if (energy > 10000) return "from-destructive to-destructive/70";
    if (energy > 1000) return "from-accent to-accent/70";
    return "from-secondary to-secondary/70";
  };

  const getSeverityLabel = () => {
    const { energy } = calculateImpact();
    if (energy > 10000) return "EXTINCTION-LEVEL EVENT";
    if (energy > 1000) return "CATASTROPHIC";
    return "SEVERE";
  };

  const handleSimulate = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
  };

  const { energy, craterSize } = calculateImpact();

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
                <Link href="/quiz">
                  <Button variant="outline" size="sm">
                    Quiz
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
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-full mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">
                  Interactive Simulation
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-balance text-primary">
                Impact Simulator
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                Customize asteroid parameters and calculate the devastating
                consequences
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/30 shadow-xl space-y-6 animate-slide-up">
                <div>
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <span className="text-4xl animate-float">☄️</span>
                    Impact Parameters
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Configure your asteroid impact scenario
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-bold">Asteroid Size</Label>
                  <RadioGroup
                    value={size}
                    onValueChange={(v) => setSize(v as Size)}
                  >
                    <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-primary/10 transition-colors border border-border/50">
                      <RadioGroupItem value="small" id="small" />
                      <Label htmlFor="small" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Small (100m)</div>
                        <div className="text-sm text-muted-foreground">
                          City-destroyer class
                        </div>
                      </Label>
                      <span className="text-2xl">🪨</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-primary/10 transition-colors border border-border/50">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Medium (1km)</div>
                        <div className="text-sm text-muted-foreground">
                          Regional devastation
                        </div>
                      </Label>
                      <span className="text-2xl">☄️</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-primary/10 transition-colors border border-border/50">
                      <RadioGroupItem value="large" id="large" />
                      <Label htmlFor="large" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Large (10km)</div>
                        <div className="text-sm text-muted-foreground">
                          Extinction-level threat
                        </div>
                      </Label>
                      <span className="text-2xl">💫</span>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-bold">Impact Velocity</Label>
                  <RadioGroup
                    value={velocity}
                    onValueChange={(v) => setVelocity(v as Velocity)}
                  >
                    <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary/10 transition-colors border border-border/50">
                      <RadioGroupItem value="slow" id="slow" />
                      <Label htmlFor="slow" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Slow (10 km/s)</div>
                        <div className="text-sm text-muted-foreground">
                          Grazing impact angle
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary/10 transition-colors border border-border/50">
                      <RadioGroupItem value="medium-v" id="medium-v" />
                      <Label
                        htmlFor="medium-v"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-semibold">Medium (20 km/s)</div>
                        <div className="text-sm text-muted-foreground">
                          Typical NEO velocity
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary/10 transition-colors border border-border/50">
                      <RadioGroupItem value="fast" id="fast" />
                      <Label htmlFor="fast" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Fast (40 km/s)</div>
                        <div className="text-sm text-muted-foreground">
                          Head-on collision
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-bold">Impact Location</Label>
                  <RadioGroup
                    value={location}
                    onValueChange={(v) => setLocation(v as Location)}
                  >
                    <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-accent/10 transition-colors border border-border/50">
                      <RadioGroupItem value="ocean" id="ocean" />
                      <Label htmlFor="ocean" className="flex-1 cursor-pointer">
                        <div className="font-semibold">🌊 Ocean Impact</div>
                        <div className="text-sm text-muted-foreground">
                          Tsunami generation zone
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-accent/10 transition-colors border border-border/50">
                      <RadioGroupItem value="city" id="city" />
                      <Label htmlFor="city" className="flex-1 cursor-pointer">
                        <div className="font-semibold">🏙️ Major City</div>
                        <div className="text-sm text-muted-foreground">
                          Maximum casualties
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-accent/10 transition-colors border border-border/50">
                      <RadioGroupItem value="desert" id="desert" />
                      <Label htmlFor="desert" className="flex-1 cursor-pointer">
                        <div className="font-semibold">🏜️ Remote Desert</div>
                        <div className="text-sm text-muted-foreground">
                          Minimal population
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSimulate}
                    className="flex-1 gradient-accent text-white text-lg py-6 hover:scale-105 transition-transform shadow-lg"
                    size="lg"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Calculate Impact
                  </Button>
                  {showResults && (
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="lg"
                      className="hover:scale-105 transition-transform bg-transparent"
                    >
                      <RotateCcw className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </Card>

              <div className="space-y-6">
                {showResults ? (
                  <>
                    <Card className="p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/30 shadow-xl animate-bounce-in">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-3xl">📊</span>
                        Impact Analysis
                      </h3>

                      <div className="space-y-4">
                        <div className="p-6 bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/40 rounded-xl">
                          <div className="text-sm text-muted-foreground mb-2 font-medium">
                            Impact Energy
                          </div>
                          <div className="text-4xl font-black text-primary mb-1">
                            {energy.toLocaleString()} MT
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Megatons of TNT equivalent
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary/40 rounded-xl">
                          <div className="text-sm text-muted-foreground mb-2 font-medium">
                            Crater Diameter
                          </div>
                          <div className="text-4xl font-black text-secondary mb-1">
                            {craterSize.toFixed(1)} km
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Approximate crater size
                          </div>
                        </div>

                        <div
                          className={`p-6 bg-gradient-to-br ${getSeverityColor()} border-2 border-white/20 rounded-xl`}
                        >
                          <div className="text-sm text-white/80 mb-2 font-medium">
                            Severity Level
                          </div>
                          <div className="text-2xl font-black text-white">
                            {getSeverityLabel()}
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-8 bg-card/90 backdrop-blur-sm border-2 border-accent/30 shadow-xl animate-slide-up">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-3xl">⚠️</span>
                        Consequences
                      </h3>
                      <ul className="space-y-4">
                        {getConsequences().map((consequence, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <span className="text-lg mt-0.5">
                              {consequence.split(" ")[0]}
                            </span>
                            <span className="text-sm leading-relaxed flex-1">
                              {consequence.substring(
                                consequence.indexOf(" ") + 1
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </>
                ) : (
                  <Card className="p-12 bg-card/90 backdrop-blur-sm border-2 border-border/30 flex items-center justify-center min-h-[600px]">
                    <div className="text-center space-y-6">
                      <div className="text-8xl mb-6 animate-float">🌍</div>
                      <h3 className="text-2xl font-bold text-muted-foreground">
                        Ready to Simulate
                      </h3>
                      <p className="text-muted-foreground max-w-sm">
                        Configure your impact parameters and click{" "}
                        <span className="text-accent font-bold">
                          Calculate Impact
                        </span>{" "}
                        to see the results
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30">
              <div className="flex items-start gap-4">
                <span className="text-3xl">💡</span>
                <div>
                  <h4 className="font-bold text-lg mb-3">Educational Note</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    These calculations are simplified for educational purposes.
                    Real asteroid impact modeling involves complex physics
                    including atmospheric entry, angle of impact, composition,
                    and many other factors. Organizations like NASA's Planetary
                    Defense Coordination Office use sophisticated simulations to
                    assess real threats.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

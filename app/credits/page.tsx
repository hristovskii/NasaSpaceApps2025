import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, MapPin, Globe, Award, Users } from "lucide-react";
import Starfield from "@/components/starfield";

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 text-foreground relative overflow-hidden">
      <Starfield />

      <div className="relative z-10">
        <header className="border-b border-border/50 backdrop-blur-md bg-background/80">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="font-semibold">Home</span>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4 animate-slide-up">
              <h1 className="text-4xl md:text-6xl font-black text-balance text-primary">
                About This Project
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
                Created for the NASA Space Apps Challenge 2025
              </p>
            </div>

            <Card className="p-8 md:p-10 bg-card/90 backdrop-blur-sm border-2 border-primary/30 shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <Award className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                    The Challenge
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Meteor Madness is an interactive educational web application
                    developed for the NASA Space Apps Challenge. The project
                    aims to make asteroid science accessible and engaging
                    through gamification, interactive simulations, and real
                    scientific data.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our mission is to educate people about near-Earth objects,
                    planetary defense, and the importance of asteroid monitoring
                    while providing an entertaining and memorable learning
                    experience.
                  </p>
                </div>
              </div>
            </Card>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-center text-foreground">
                Meet the Team
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 bg-card/90 backdrop-blur-sm border-2 border-primary/30 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/50 shadow-lg">
                      <img
                        src="/teo.jpg"
                        alt="Teodor Krstevski"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Teodor Krstevski
                      </h3>
                      <p className="text-blue-500 font-semibold mb-2">
                        Computer Science & Engineering Student
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        CSE student at FINKI (Faculty of Computer Science and
                        Engineering), passionate about hardware, space science,
                        and creating educational technology that makes learning
                        fun and accessible.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card/90 backdrop-blur-sm border-2 border-primary/30 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/50 shadow-lg">
                      <img
                        src="/ivo.jpg"
                        alt="Ivo Filipovski"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Ivo Filipovski
                      </h3>
                      <p className="text-blue-500 font-semibold mb-2">
                        High School <br />
                        Student
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Student at Gjorgi Dimitrov High School with a keen
                        interest in astronomy, programming, and interactive
                        design. Enthusiastic about combining creativity with
                        technology to solve real-world problems.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card/90 backdrop-blur-sm border-2 border-primary/30 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/50 shadow-lg">
                      <img
                        src="/pedzo.jpg"
                        alt="Petar Hristovski"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Petar Hristovski
                      </h3>
                      <p className="text-blue-500 font-semibold mb-2">
                        Computer Science & Engineering Student
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        CSE student at FINKI with a passion for software
                        development, problem-solving, and innovative technology
                        solutions. Dedicated to creating impactful applications
                        that bridge education and entertainment.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <Card className="p-8 md:p-10 bg-gradient-to-br from-success/10 via-primary/10 to-secondary/10 border-2 border-success/30 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-8 w-8 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                      Event Location
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      This project was developed at{" "}
                      <a
                        href="https://base42.mk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-success font-bold hover:text-success/80 transition-colors underline"
                      >
                        Base42
                      </a>{" "}
                      in Skopje, Macedonia - a hackerspace for builders and the
                      curious, dedicated to knowledge sharing, community
                      building, and collaborative learning.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      <a
                        href="https://base42.mk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-success font-bold hover:text-success/80 transition-colors underline"
                      >
                        Base42
                      </a>{" "}
                      provided the perfect environment for collaboration,
                      creativity, and innovation during the NASA Space Apps
                      Challenge hackathon.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-border/50">
                  <Globe className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      Hosted on Local Servers
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      The web application is hosted on local servers at{" "}
                      <a
                        href="https://base42.mk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-success font-bold hover:text-success/80 transition-colors underline"
                      >
                        Base42
                      </a>
                      , showcasing the technical infrastructure and support
                      provided by the venue for hackathon participants.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/30 shadow-xl">
              <div className="flex items-start gap-4">
                <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                    Acknowledgments
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Special thanks to{" "}
                    <a
                      href="https://spaceapps.mk/#skopje"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-success font-bold hover:text-success/80 transition-colors underline"
                    >
                      NASA Space Apps Challenge Skopje
                    </a>{" "}
                    for organizing this incredible global hackathon that brings
                    together innovators, scientists, and developers to solve
                    real-world challenges using NASA's open data.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Thanks to{" "}
                    <a
                      href="https://base42.mk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-success font-bold hover:text-success/80 transition-colors underline"
                    >
                      Base42
                    </a>{" "}
                    for hosting the event and providing an inspiring space for
                    innovation and collaboration.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    All asteroid data and scientific information used in this
                    project is based on publicly available NASA resources and
                    research from the Center for Near-Earth Object Studies
                    (CNEOS) and the Planetary Defense Coordination Office
                    (PDCO).
                  </p>
                </div>
              </div>
            </Card>

            <div className="text-center pt-8">
              <Link href="/">
                <Button
                  size="lg"
                  className="gradient-primary text-white text-lg px-10 py-6"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

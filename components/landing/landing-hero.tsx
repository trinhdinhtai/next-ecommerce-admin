"use client";

import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best E-commerce Platform</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C79BD] to-[#5AA2D6] py-4">
          <TypewriterComponent
            options={{
              strings: [
                "Understand User Needs",
                "Data Analytics and Reporting",
                "Performance and Speed",
                "Scalability",
                "Security",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start For Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
    </div>
  );
};

export default LandingHero;

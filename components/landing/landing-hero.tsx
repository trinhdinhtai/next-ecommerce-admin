"use client";

import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

const LandingHero = () => {
  const { isSignedIn } = useAuth();
  const { theme } = useTheme();

  return (
    <div className="font-bold py-36 px-4 text-center space-y-10">
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

      <p className="font-normal text-center text-muted-foreground flex flex-col">
        <span>E-commerce platform with essential commerce features</span>
        <span>Built with Next.js 13 server components</span>
      </p>

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

      <div className="relative aspect-[32/18] rounded-2xl mt-10">
        <Image
          fill
          src={
            theme === "light" ? "/screenshot-light.png" : "/screenshot-dark.png"
          }
          alt="hero-banner"
          className="object-cover rounded-3xl"
        />
      </div>
    </div>
  );
};

export default LandingHero;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-background shadow-sm dark:shadow-none dark:border-b sticky top-0 z-30">
      <div className="mx-auto max-w-screen-xl h-full w-full flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image alt="Logo" src="/logo.png" width={40} height={40} />
          <h1 className="text-3xl font-bold ml-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1C79BD] to-[#5AA2D6]">
            GM Admin
          </h1>
          {/* <h1 className={cn("text-3xl font-bold ml-2 text-[#1C79BD]")}>
          GM Admin
        </h1> */}
        </Link>
        <div className="flex items-center gap-x-2">
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;

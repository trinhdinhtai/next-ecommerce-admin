"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  console.log(
    "file: landing-navbar.tsx:15 ~ LandingNavbar ~ isSignedIn:",
    isSignedIn
  );

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <Image alt="Logo" src="/logo.png" width={40} height={40} />
        <h1 className={cn("text-3xl font-bold ml-2")}>GM Admin</h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;

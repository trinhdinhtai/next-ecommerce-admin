"use client"

import Image from "next/image"
import { useInView } from "react-intersection-observer"

import { cn } from "@/lib/utils"

export const HeroImage = () => {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true })

  return (
    <div ref={ref} className="py-10 [perspective:2000px]">
      <div
        className={cn(
          "border-transparent-white bg-hero-gradient relative rounded-lg border bg-white bg-opacity-[0.01]",
          inView ? "animate-image-rotate" : "[transform:rotateX(25deg)]",
          "before:bg-hero-glow before:absolute before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[filter:blur(120px)]",
          inView && "before:animate-image-glow"
        )}
      >
        <Image
          src="/hero.png"
          alt="hero"
          priority
          placeholder="blur"
          blurDataURL="hero.png"
          className={cn(
            "delay-[680ms] relative z-10 rounded-lg transition-opacity",
            inView ? "opacity-100" : "opacity-0"
          )}
          width={1920}
          height={1080}
        />
      </div>
    </div>
  )
}

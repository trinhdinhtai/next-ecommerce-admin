"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useI18n, useScopedI18n } from "@/i18n/client"
import { stagger, useAnimate } from "framer-motion"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { HeroImage } from "@/components/landing/hero-image"

export default function HeroSection() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      "#transform-anim",
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.5, ease: "easeIn", delay: stagger(0.3) }
    )
  })

  const t = useI18n()
  const landingScopeT = useScopedI18n("landing")

  return (
    <section className="space-y-10 pt-36 text-center font-bold">
      <div ref={scope} className="space-y-16">
        <h1
          id="transform-anim"
          className="bg-heading-gradient-dark bg-clip-text text-center font-heading text-4xl tracking-tight text-transparent dark:bg-heading-gradient-light md:text-6xl md:leading-snug"
        >
          {landingScopeT("title", {
            prefix: (
              <>
                <br className="md:block" /> {t("landing.prefix")}
              </>
            ),
            siteName: (
              <span className="bg-primary-gradient bg-clip-text text-transparent">
                GM Admin
              </span>
            ),
          })}
        </h1>

        <p id="transform-anim" className="font-normal text-muted-foreground">
          <span>{landingScopeT("description")}</span>
        </p>

        <Link
          id="transform-anim"
          href="/sign-in"
          className={cn(
            buttonVariants({ variant: "premium", size: "lg" }),
            "h-12 gap-2 rounded-full pr-2"
          )}
        >
          <span>{t("button.start")}</span>
          <span className="right-0 inline-block rounded-full bg-white/50 p-[0.5rem]">
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </span>
        </Link>
      </div>

      <div className="relative mt-10 aspect-[32/18] rounded-2xl">
        <HeroImage />
      </div>
    </section>
  )
}

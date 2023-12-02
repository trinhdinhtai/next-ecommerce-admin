"use client"

import Link from "next/link"
import { useI18n, useScopedI18n } from "@/i18n/client"
import { ChevronRight } from "lucide-react"
import { Balancer } from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { HeroImage } from "@/components/landing/hero-image"

const LandingHero = () => {
  const t = useI18n()
  const landingScopeT = useScopedI18n("landing")

  return (
    <div className="space-y-10 px-4 py-36 text-center font-bold">
      <div className="space-y-5 text-5xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
        <Balancer
          as="p"
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <h1 className="bg-heading-gradient-dark dark:bg-heading-gradient-light bg-clip-text text-center font-heading text-4xl tracking-tight text-transparent md:text-6xl md:leading-snug">
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
        </Balancer>
      </div>

      <p className="flex flex-col text-center font-normal text-muted-foreground">
        <span>{landingScopeT("description")}</span>
      </p>

      <Link
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

      <div className="relative mt-10 aspect-[32/18] rounded-2xl">
        <HeroImage />
      </div>
    </div>
  )
}

export default LandingHero

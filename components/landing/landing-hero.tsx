"use client"

import Image from "next/image"
import Link from "next/link"
import { useI18n, useScopedI18n } from "@/i18n/client"
import { useTheme } from "next-themes"
import { Balancer } from "react-wrap-balancer"
import TypewriterComponent from "typewriter-effect"

import { Button } from "@/components/ui/button"

const LandingHero = () => {
  const { theme } = useTheme()
  const t = useI18n()
  const landingScopeT = useScopedI18n("landing")
  const typeWriterScopeT = useScopedI18n("landing.typeWriter")

  return (
    <div className="space-y-10 px-4 py-36 text-center font-bold">
      <div className="space-y-5 text-5xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
        <Balancer
          as="p"
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span>{landingScopeT("title")}</span>
        </Balancer>
        <div className="bg-gradient-to-r from-[#1C79BD] to-[#5AA2D6] bg-clip-text py-4 font-heading text-2xl text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
          <TypewriterComponent
            options={{
              strings: [
                typeWriterScopeT("text1"),
                typeWriterScopeT("text2"),
                typeWriterScopeT("text3"),
                typeWriterScopeT("text4"),
                typeWriterScopeT("text5"),
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>

      <p className="flex flex-col text-center font-normal text-muted-foreground">
        <span>{landingScopeT("description")}</span>
      </p>

      <div>
        <Link href="/sign-in">
          <Button
            variant="premium"
            className="rounded-full p-4 font-semibold md:p-6 md:text-lg"
          >
            {t("button.start")}
          </Button>
        </Link>
      </div>

      <div className="relative mt-10 aspect-[32/18] rounded-2xl">
        <Image
          fill
          src={
            theme === "light" ? "/screenshot-light.png" : "/screenshot-dark.png"
          }
          alt="hero-banner"
          className="rounded-3xl object-cover"
        />
      </div>
    </div>
  )
}

export default LandingHero

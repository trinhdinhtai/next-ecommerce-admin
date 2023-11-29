"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslation } from "@/i18n/client"
import { useTheme } from "next-themes"
import { Balancer } from "react-wrap-balancer"
import TypewriterComponent from "typewriter-effect"

import { Button } from "@/components/ui/button"

const LandingHero = () => {
  const { theme } = useTheme()
  const params = useParams()
  const { t } = useTranslation(params.locale)
  const { t: landing } = useTranslation(params.locale, "landing")

  return (
    <div className="space-y-10 px-4 py-36 text-center font-bold">
      <div className="space-y-5 text-5xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
        <Balancer
          as="p"
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span>{landing("title")}</span>
        </Balancer>
        <div className="bg-gradient-to-r from-[#1C79BD] to-[#5AA2D6] bg-clip-text py-4 font-heading text-2xl text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
          <TypewriterComponent
            options={{
              strings: [
                landing("typeWriter.text-1"),
                landing("typeWriter.text-2"),
                landing("typeWriter.text-3"),
                landing("typeWriter.text-4"),
                landing("typeWriter.text-5"),
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>

      <p className="flex flex-col text-center font-normal text-muted-foreground">
        <span>{landing("description")}</span>
      </p>

      <div>
        <Link href="/sign-in">
          <Button
            variant="premium"
            className="rounded-full p-4 font-semibold md:p-6 md:text-lg"
          >
            {t("start")}
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

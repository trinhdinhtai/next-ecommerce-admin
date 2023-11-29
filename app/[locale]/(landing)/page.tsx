import { Locale } from "@/i18n/config"

import { getDictionary } from "@/lib/dictionary"
import LandingContent from "@/components/landing/landing-content"
import LandingFooter from "@/components/landing/landing-footer"
import LandingHero from "@/components/landing/landing-hero"
import LandingNavbar from "@/components/landing/landing-navbar"

interface LandingPageProps {
  params: { locale: Locale }
}

export default async function LandingPage({
  params: { locale },
}: LandingPageProps) {
  const dictionary = await getDictionary(locale)

  return (
    <>
      <LandingNavbar dictionary={dictionary} />
      <main className="h-full overflow-auto">
        <div className="mx-auto h-full w-full max-w-screen-xl">
          <div className="h-full">
            <LandingHero dictionary={dictionary.landing} />
            <LandingContent />
          </div>
        </div>
      </main>
      <LandingFooter />
    </>
  )
}

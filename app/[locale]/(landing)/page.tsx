import LandingContent from "@/components/landing/landing-content"
import LandingFooter from "@/components/landing/landing-footer"
import LandingHero from "@/components/landing/landing-hero"
import LandingNavbar from "@/components/landing/landing-navbar"

export default async function LandingPage() {
  return (
    <>
      <LandingNavbar />
      <main className="duration-really-slow h-full overflow-auto animate-in fade-in slide-in-from-bottom-8">
        <div className="mx-auto h-full w-full max-w-screen-xl">
          <div className="h-full">
            <LandingHero />
            <LandingContent />
          </div>
        </div>
      </main>
      <LandingFooter />
    </>
  )
}

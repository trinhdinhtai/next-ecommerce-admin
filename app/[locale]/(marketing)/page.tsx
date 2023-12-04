import BillingSection from "@/components/landing/billing-section"
import HeroSection from "@/components/landing/hero-section"
import TestimonialsSection from "@/components/landing/testimonials-section"

export default async function LandingPage() {
  return (
    <div className="mx-auto h-full w-full max-w-screen-xl space-y-24">
      <HeroSection />
      <TestimonialsSection />
      <BillingSection />
    </div>
  )
}

"use client"

import { useScopedI18n } from "@/i18n/client"

import TestimonialsSection from "@/components/landing/testimonials-section"

const LandingContent = () => {
  const testimonialsScope = useScopedI18n("landing.testimonials")

  return (
    <div className="px-10 pb-20">
      <h2 className="mb-10 text-center text-4xl font-extrabold">
        {testimonialsScope("description", {
          siteName: (
            <span className="bg-primary-gradient bg-clip-text text-transparent">
              GM Admin
            </span>
          ),
        })}
      </h2>

      <TestimonialsSection />
    </div>
  )
}

export default LandingContent

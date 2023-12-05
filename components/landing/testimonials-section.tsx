"use client"

import { useScopedI18n } from "@/i18n/client"
import { motion } from "framer-motion"

import TestimonialCard, {
  Testimonial,
} from "@/components/landing/testimonial-card"

export default function TestimonialsSection() {
  const testimonialsScope = useScopedI18n("landing.testimonials")

  const testimonials: Testimonial[] = [
    {
      name: "Phung Tu Linh",
      avatarUrl: "https://avatars.githubusercontent.com/linhpt411",
      title: "CEO of an Online Retail Store",
      description:
        "Our business was struggling to keep up with the demands of managing our eCommerce operations efficiently. Then we found this eCommerce management application, and it has been a game-changer! It streamlined our inventory management, order processing, and sales tracking. Highly recommended!",
    },
    {
      name: "Nguyen Thanh Hoan",
      avatarUrl: "https://avatars.githubusercontent.com/hoannt0308",
      title: "Small Business Owner",
      description:
        "As a small business owner, I wear many hats. This eCommerce management app has been a lifesaver. It's intuitive and user-friendly, and I can manage my online store effortlessly. It has saved me so much time and has helped my business grow.",
    },
    {
      name: "Pham Dong Dong",
      avatarUrl: "https://avatars.githubusercontent.com/dongpdgm",
      title: "Operations Manager",
      description:
        "I was skeptical at first, but after implementing this eCommerce management application in our company, I couldn't be happier. Our team now has complete control over our online store, and the analytics tools have helped us make data-driven decisions. It's a must-have for any eCommerce business.",
    },
    {
      name: "Trinh Dinh Tai",
      avatarUrl: "https://avatars.githubusercontent.com/taitddev",
      title: "Marketing Manager",
      description:
        "This application has made marketing our products online a breeze. The built-in marketing tools, including email campaigns and social media integration, have significantly boosted our online presence. Our sales have skyrocketed since we started using it.",
    },
  ]

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      viewport={{
        once: true,
      }}
      className="space-y-10"
    >
      <h2 className="mb-10 text-center text-4xl font-extrabold">
        {testimonialsScope("description", {
          siteName: (
            <span className="bg-primary-gradient bg-clip-text text-transparent">
              GM Admin
            </span>
          ),
        })}
      </h2>

      <div className="mb-5 grid grid-cols-1 items-stretch gap-10 p-4 md:grid-cols-2">
        {testimonials.map((item) => (
          <TestimonialCard key={item.description} item={item} />
        ))}
      </div>
    </motion.section>
  )
}

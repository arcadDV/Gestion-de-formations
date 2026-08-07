import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/home/hero"
import { CategoriesSection } from "@/components/home/categories-section"
import { PopularCourses } from "@/components/home/popular-courses"
import { WhyUs } from "@/components/home/why-us"
import { Testimonials } from "@/components/home/testimonials"
import { CtaSection } from "@/components/home/cta"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNavbar />
      <main className="flex-1">
        <Hero />
        <CategoriesSection />
        <PopularCourses />
        <WhyUs />
        <Testimonials />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}

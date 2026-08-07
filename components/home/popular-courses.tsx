"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { useData } from "@/lib/data-context"

export function PopularCourses() {
  const { courses } = useData()

  const popular = [...courses]
    .filter((c) => c.published)
    .sort((a, b) => b.students - a.students)
    .slice(0, 3)

  return (
    <section className="bg-muted/40 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Formations populaires</h2>
            <p className="mt-3 max-w-lg text-muted-foreground text-pretty">
              Les formations les plus suivies par notre communauté d&apos;apprenants.
            </p>
          </div>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/formations">
              Voir tout
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popular.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  )
}

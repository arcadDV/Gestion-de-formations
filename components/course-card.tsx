"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Clock, PlayCircle, Star } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { formatPrice } from "@/lib/mock-data"
import type { Course } from "@/lib/types"

const LEVEL_STYLES: Record<string, string> = {
  Débutant: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  Intermédiaire: "bg-primary/10 text-primary border-primary/25",
  Avancé: "bg-chart-4/15 text-chart-4 border-chart-4/30",
}

export function CourseCard({ course }: { course: Course }) {
  const router = useRouter()
  const { user } = useAuth()
  const { enroll, isEnrolled } = useData()

  const enrolled = user ? isEnrolled(user.id, course.id) : false

  function handleEnroll() {
    if (!user) {
      toast.info("Connectez-vous pour vous inscrire à une formation.")
      router.push("/connexion")
      return
    }
    enroll(user.id, course.id)
    toast.success(`Inscription réussie à « ${course.title} ».`)
  }

  return (
    <Card className="group flex h-full flex-col overflow-hidden py-0 transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/formations/${course.id}`} className="relative block aspect-video overflow-hidden">
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className="border-transparent bg-background/90 text-foreground shadow-sm backdrop-blur">
            {course.category}
          </Badge>
        </div>
        {course.demoVideo ? (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-sm">
            <PlayCircle className="size-3.5" />
            Vidéo
          </div>
        ) : null}
      </Link>

      <CardContent className="flex flex-1 flex-col gap-3 px-5 pt-5">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className={LEVEL_STYLES[course.level]}>
            {course.level}
          </Badge>
          {course.rating > 0 ? (
            <span className="flex items-center gap-1 text-sm font-medium">
              <Star className="size-4 fill-chart-5 text-chart-5" />
              {course.rating.toFixed(1)}
            </span>
          ) : null}
        </div>

        <Link href={`/formations/${course.id}`}>
          <h3 className="font-heading text-lg font-semibold leading-snug text-balance transition-colors group-hover:text-primary">
            {course.title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{course.description}</p>

        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="size-3.5" />
            {course.modules} modules
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3 border-t bg-muted/30 px-5 py-4">
        <span className="font-heading text-lg font-bold text-primary">{formatPrice(course.price)}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/formations/${course.id}`}>Détails</Link>
          </Button>
          <Button size="sm" onClick={handleEnroll} disabled={enrolled}>
            {enrolled ? "Inscrit" : "S'inscrire"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

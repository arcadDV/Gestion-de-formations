"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Layers,
  Star,
  Users,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { formatPrice } from "@/lib/mock-data"
import type { Course } from "@/lib/types"

export function CourseDetail({ courseId }: { courseId: string }) {
  const router = useRouter()
  const { user } = useAuth()
  const { getCourse, enroll, isEnrolled } = useData()

  const course = getCourse(courseId)

  /*
   * Vérification de l'existence de la formation.
   * Si getCourse() ne trouve aucune formation,
   * on affiche une page d'erreur.
   */
  if (!course) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-bold">
          Formation introuvable
        </h1>

        <p className="text-muted-foreground">
          Cette formation n&apos;existe pas ou a été supprimée.
        </p>

        <Button asChild>
          <Link href="/formations">
            Retour aux formations
          </Link>
        </Button>
      </div>
    )
  }

  /*
   * À partir d'ici, TypeScript sait que course existe.
   */
  const enrolled = user
    ? isEnrolled(user.id, course.id)
    : false

  function handleEnroll() {
    /*
     * Vérification de l'utilisateur connecté.
     */
    if (!user) {
      toast.info(
        "Connectez-vous pour vous inscrire à cette formation."
      )

      router.push("/connexion")
      return
    }

    /*
     * Sécurité supplémentaire.
     * Cette vérification évite toute erreur si course
     * devenait indisponible.
     */
    if (!course) {
      toast.error("Cette formation est introuvable.")
      return
    }

    /*
     * Inscription de l'utilisateur.
     */
    enroll(user.id, course.id)

    toast.success(
      "Inscription réussie ! Retrouvez la formation dans votre espace."
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Retour aux formations */}
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="mb-6 gap-2 text-muted-foreground"
      >
        <Link href="/formations">
          <ArrowLeft className="size-4" />
          Toutes les formations
        </Link>
      </Button>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Contenu principal */}
        <div className="lg:col-span-2">
          {/* Catégorie */}
          <Badge className="mb-3">
            {course.category}
          </Badge>

          {/* Titre */}
          <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
            {course.title}
          </h1>

          {/* Description courte */}
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            {course.description}
          </p>

          {/* Informations */}
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-chart-5 text-chart-5" />

              <strong className="text-foreground">
                {course.rating.toFixed(1)}
              </strong>
            </span>

            <span className="flex items-center gap-1.5">
              <Users className="size-4" />
              {course.students} inscrits
            </span>

            <span className="flex items-center gap-1.5">
              <GraduationCap className="size-4" />
              {course.instructor}
            </span>
          </div>

          {/* Image de la formation */}
          <div className="mt-8">
            <div className="relative aspect-video overflow-hidden rounded-xl ring-1 ring-border">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Description complète */}
          <section className="mt-10">
            <h2 className="font-heading text-xl font-semibold">
              Description
            </h2>

            <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">
              {course.longDescription}
            </p>
          </section>

          {/* Objectifs */}
          <section className="mt-10">
            <h2 className="font-heading text-xl font-semibold">
              Objectifs de la formation
            </h2>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {course.objectives.map((objective) => (
                <li
                  key={objective}
                  className="flex items-start gap-2.5 text-sm"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />

                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Compétences */}
          <section className="mt-10">
            <h2 className="font-heading text-xl font-semibold">
              Compétences acquises
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3 py-1 text-sm font-normal"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        </div>

        {/* Colonne droite */}
        <aside className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="flex flex-col gap-5 p-6">
              {/* Prix */}
              <div>
                <p className="font-heading text-3xl font-extrabold text-primary">
                  {formatPrice(course.price)}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Accès complet à la formation
                </p>
              </div>

              {/* Bouton inscription */}
              <Button
                size="lg"
                className="gap-2"
                onClick={handleEnroll}
                disabled={enrolled}
              >
                {enrolled ? (
                  <>
                    <CheckCircle2 className="size-4" />
                    Déjà inscrit
                  </>
                ) : (
                  <>
                    <GraduationCap className="size-4" />
                    S&apos;inscrire maintenant
                  </>
                )}
              </Button>

              {/* Informations formation */}
              <ul className="flex flex-col gap-3 border-t border-border pt-5 text-sm">
                <InfoRow
                  icon={<Layers className="size-4" />}
                  label="Niveau"
                  value={course.level}
                />

                <InfoRow
                  icon={<Clock className="size-4" />}
                  label="Durée"
                  value={course.duration}
                />

                <InfoRow
                  icon={<BookOpen className="size-4" />}
                  label="Modules"
                  value={`${course.modules} modules`}
                />

                <InfoRow
                  icon={<Users className="size-4" />}
                  label="Étudiants"
                  value={`${course.students} inscrits`}
                />
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

/*
 * Ligne d'information utilisée dans la carte
 * de droite.
 */
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <li className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-muted-foreground">
        {icon}
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>
    </li>
  )
}
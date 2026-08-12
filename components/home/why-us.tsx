import { Award, GraduationCap, Headphones, Users } from "lucide-react"

const STATS = [
  { value: "10+", label: "Formations" },
  { value: "2 500+", label: "Étudiants formés" },
  { value: "95%", label: "Taux de satisfaction" },
  { value: "15+", label: "Formateurs experts" },
]

const REASONS = [
  {
    icon: GraduationCap,
    title: "Formateurs experts",
    description: "Des professionnels expérimentés qui partagent leur savoir-faire concret du terrain.",
  },
  {
    icon: Award,
    title: "Certifications reconnues",
    description: "Obtenez des certifications valorisantes pour votre carrière et votre CV.",
  },
  {
    icon: Headphones,
    title: "Accompagnement continu",
    description: "Un suivi personnalisé tout au long de votre parcours de formation.",
  },
  {
    icon: Users,
    title: "Communauté active",
    description: "Rejoignez un réseau d'apprenants et de professionnels du numérique.",
  },
]

export function WhyUs() {
  return (
    <section id="pourquoi" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:px-12">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-extrabold sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-primary-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Pourquoi choisir Netzone Service ?
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Nous accompagnons particuliers et entreprises gabonaises dans leur montée en compétences numériques avec une
            approche pratique, orientée résultats et adaptée au marché de l&apos;emploi au Gabon.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {REASONS.map((reason) => {
            const Icon = reason.icon
            return (
              <div key={reason.title} className="rounded-xl border border-border bg-card p-5">
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading font-semibold">{reason.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

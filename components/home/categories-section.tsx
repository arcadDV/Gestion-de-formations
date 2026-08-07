import Link from "next/link"
import {
  BrainCircuit,
  Cloud,
  Code2,
  FileSpreadsheet,
  Megaphone,
  Network,
  ShieldCheck,
  Smartphone,
  Terminal,
  Video,
} from "lucide-react"
import { CATEGORIES } from "@/lib/mock-data"

const ICONS: Record<string, typeof Code2> = {
  "Développement Web": Code2,
  "Développement Mobile": Smartphone,
  "Marketing Digital": Megaphone,
  "Sécurité Informatique": ShieldCheck,
  "Intelligence Artificielle": BrainCircuit,
  "Montage Vidéo": Video,
  "Administration Linux": Terminal,
  "Cloud Computing": Cloud,
  "Réseaux Informatiques": Network,
  "Bureautique Professionnelle": FileSpreadsheet,
}

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Explorez nos domaines de formation
        </h2>
        <p className="mt-3 text-muted-foreground text-pretty">
          Dix spécialités pour couvrir tous les métiers du numérique et de l&apos;informatique.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((cat) => {
          const Icon = ICONS[cat]
          return (
            <Link
              key={cat}
              href={`/formations?categorie=${encodeURIComponent(cat)}`}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" />
              </span>
              <span className="text-sm font-medium leading-tight">{cat}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

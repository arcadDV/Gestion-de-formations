import { Quote } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TESTIMONIALS } from "@/lib/mock-data"

export function Testimonials() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Ils nous font confiance
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            Découvrez les témoignages de nos anciens apprenants.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <Quote className="size-8 text-primary/30" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                {`« ${t.quote} »`}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

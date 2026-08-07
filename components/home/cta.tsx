import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl px-6 py-16 text-center sm:px-12">
        <Image src="/cta-bg.png" alt="" fill sizes="100vw" className="object-cover" aria-hidden />
        <div className="absolute inset-0 bg-primary/85" aria-hidden />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-primary-foreground">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Prêt à transformer votre carrière ?
          </h2>
          <p className="text-lg text-primary-foreground/80 text-pretty">
            Rejoignez Netzone Service dès aujourd&apos;hui et accédez à des formations de qualité pour maîtriser les
            compétences du numérique.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" variant="secondary" asChild className="gap-2">
              <Link href="/inscription">
                Créer un compte gratuit
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/formations">Parcourir les formations</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

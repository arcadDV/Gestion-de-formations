"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowRight, Search, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/formations?q=${encodeURIComponent(q)}` : "/formations")
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent/40 to-background">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="size-4" />
            Centre de formation certifié
          </span>

          <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Développez vos compétences numériques avec{" "}
            <span className="text-primary">Netzone Service</span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
            Des formations professionnelles en développement, cybersécurité, intelligence artificielle et bien plus.
            Apprenez auprès d&apos;experts et boostez votre carrière.
          </p>

          <form onSubmit={handleSearch} className="flex max-w-md gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une formation..."
                className="h-12 pl-9"
                aria-label="Rechercher une formation"
              />
            </div>
            <Button type="submit" size="lg" className="h-12">
              Rechercher
            </Button>
          </form>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button size="lg" asChild className="gap-2">
              <Link href="/formations">
                Découvrir nos formations
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-chart-5 text-chart-5" />
                ))}
              </div>
              <span>
                <strong className="text-foreground">4.8/5</strong> · +2 500 étudiants
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border">
            <Image
              src="/hero-formation.png"
              alt="Étudiants en formation chez Netzone Service"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-border bg-card p-4 shadow-xl sm:block">
            <p className="font-heading text-2xl font-bold text-primary">10+</p>
            <p className="text-xs text-muted-foreground">Domaines de formation</p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Suspense } from "react"
import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { CoursesExplorer } from "@/components/formations/courses-explorer"

export default function FormationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNavbar />
      <main className="flex-1">
        <section className="border-b border-border bg-accent/30">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Nos formations
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground text-pretty">
              Parcourez notre catalogue de formations professionnelles et trouvez le programme adapté à vos objectifs.
            </p>
          </div>
        </section>
        <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-20 text-center text-muted-foreground">Chargement...</div>}>
          <CoursesExplorer />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}

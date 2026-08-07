"use client"

import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, SearchX, Search } from "lucide-react"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useData } from "@/lib/data-context"
import { CATEGORIES } from "@/lib/mock-data"

const PAGE_SIZE = 6
const LEVELS = ["Débutant", "Intermédiaire", "Avancé"] as const

export function CoursesExplorer() {
  const params = useSearchParams()
  const { courses } = useData()

  const [query, setQuery] = useState(params.get("q") ?? "")
  const [category, setCategory] = useState(params.get("categorie") ?? "all")
  const [level, setLevel] = useState("all")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return courses
      .filter((c) => c.published)
      .filter((c) => (category === "all" ? true : c.category === category))
      .filter((c) => (level === "all" ? true : c.level === level))
      .filter((c) =>
        q ? c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) : true,
      )
  }, [courses, query, category, level])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function resetToFirstPage<T>(setter: (v: T) => void) {
    return (value: T) => {
      setter(value)
      setPage(1)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => resetToFirstPage(setQuery)(e.target.value)}
            placeholder="Rechercher par titre, description ou catégorie..."
            className="pl-9"
            aria-label="Rechercher une formation"
          />
        </div>
        <Select value={category} onValueChange={resetToFirstPage(setCategory)}>
          <SelectTrigger className="sm:w-56" aria-label="Filtrer par catégorie">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={level} onValueChange={resetToFirstPage(setLevel)}>
          <SelectTrigger className="sm:w-44" aria-label="Filtrer par niveau">
            <SelectValue placeholder="Niveau" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les niveaux</SelectItem>
            {LEVELS.map((lv) => (
              <SelectItem key={lv} value={lv}>
                {lv}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        <strong className="text-foreground">{filtered.length}</strong>{" "}
        {filtered.length > 1 ? "formations trouvées" : "formation trouvée"}
      </p>

      {visible.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
          <SearchX className="size-10 text-muted-foreground" />
          <p className="font-medium">Aucune formation ne correspond à votre recherche</p>
          <p className="text-sm text-muted-foreground">Essayez de modifier vos filtres ou votre recherche.</p>
        </div>
      )}

      {totalPages > 1 ? (
        <div className="mt-10 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Page précédente"
          >
            <ChevronLeft className="size-4" />
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="icon"
              onClick={() => setPage(i + 1)}
              aria-label={`Page ${i + 1}`}
              aria-current={currentPage === i + 1}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Page suivante"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      ) : null}
    </div>
  )
}

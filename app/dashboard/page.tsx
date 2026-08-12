"use client"

import Link from "next/link"
import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const { user, loading } = useAuth()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="font-heading text-3xl font-bold text-foreground">Tableau de bord</h1>
        {loading ? (
          <p className="mt-3 text-muted-foreground">Chargement de votre session…</p>
        ) : user ? (
          <div className="mt-6 space-y-4">
            <p className="text-muted-foreground">
              Bonjour {user.firstName} {user.lastName}. Vous êtes connecté en tant que{" "}
              <span className="font-medium text-foreground">
                {user.role === "admin" ? "administrateur" : "apprenant"}
              </span>
              .
            </p>
            <Button asChild>
              <Link href="/formations">Voir les formations</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="text-muted-foreground">Vous devez vous connecter pour accéder à cet espace.</p>
            <Button asChild>
              <Link href="/connexion">Se connecter</Link>
            </Button>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}

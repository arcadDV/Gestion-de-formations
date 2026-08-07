"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

export function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const result = login(email, password)
      setLoading(false)
      if (result.ok) {
        toast.success("Connexion réussie", { description: "Bienvenue sur votre espace." })
        router.push(result.role === "admin" ? "/admin" : "/dashboard")
      } else {
        toast.error("Échec de la connexion", { description: result.error })
      }
    }, 600)
  }

  function fillDemo(role: "student" | "admin") {
    if (role === "admin") {
      setEmail("admin@netzone.cm")
      setPassword("admin123")
    } else {
      setEmail("aïcha@example.com")
      setPassword("demo123")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Adresse email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="vous@exemple.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Mot de passe</Label>
          <Link href="#" className="text-xs font-medium text-primary hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading && <Loader2 className="size-4 animate-spin" />}
        Se connecter
      </Button>

      <div className="rounded-lg border border-dashed border-border bg-muted/40 p-3">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Comptes de démonstration</p>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => fillDemo("student")}>
            Apprenant
          </Button>
          <Button type="button" variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => fillDemo("admin")}>
            Administrateur
          </Button>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Créer un compte
        </Link>
      </p>
    </form>
  )
}

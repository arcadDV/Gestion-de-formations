"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { Role, User } from "./types"

interface AuthResult {
  ok: boolean
  message?: string
  role?: Role
  needsConfirmation?: boolean
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<AuthResult>
  register: (data: {
    firstName: string
    lastName: string
    email: string
    password: string
    role?: Role
  }) => Promise<AuthResult>
  logout: () => Promise<void>
  updateProfile: (data: Partial<Pick<User, "firstName" | "lastName" | "email">>) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function mapUser(raw: Record<string, unknown> | null | undefined): User | null {
  if (!raw) return null
  return {
    id: String(raw.id),
    firstName: String(raw.firstName ?? ""),
    lastName: String(raw.lastName ?? ""),
    email: String(raw.email ?? ""),
    role: (raw.role === "admin" ? "admin" : "student") as Role,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me")
      if (!res.ok) {
        setUser(null)
        return
      }
      const data = await res.json()
      setUser(mapUser(data.user))
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    refreshUser().finally(() => setLoading(false))
  }, [refreshUser])

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      })
      const data = await res.json()

      if (!res.ok) {
        return { ok: false, message: data.error ?? "Identifiants incorrects." }
      }

      const mapped = mapUser(data.profile)
      setUser(mapped)
      return { ok: true, role: mapped?.role ?? "student" }
    } catch {
      return { ok: false, message: "Impossible de se connecter. Réessayez." }
    }
  }, [])

  const register = useCallback<AuthContextValue["register"]>(async (data) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
          role: data.role ?? "student",
        }),
      })
      const payload = await res.json()

      if (!res.ok) {
        return { ok: false, message: payload.error ?? "Inscription impossible." }
      }

      if (payload.needsConfirmation) {
        return {
          ok: true,
          needsConfirmation: true,
          message: "Compte créé. Vérifiez votre email pour confirmer l'inscription.",
        }
      }

      const mapped = mapUser(payload.profile)
      setUser(mapped)
      return { ok: true, role: mapped?.role ?? "student" }
    } catch {
      return { ok: false, message: "Impossible de créer le compte. Réessayez." }
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } finally {
      setUser(null)
    }
  }, [])

  const updateProfile = useCallback<AuthContextValue["updateProfile"]>((data) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev))
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, register, logout, updateProfile }),
    [user, loading, login, register, logout, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider")
  return ctx
}

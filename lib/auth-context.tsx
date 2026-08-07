"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { INITIAL_USERS } from "./mock-data"
import type { Role, User } from "./types"

interface AuthResult {
  ok: boolean
  message?: string
}

interface AuthContextValue {
  user: User | null
  users: User[]
  login: (email: string, password: string) => AuthResult
  register: (data: {
    firstName: string
    lastName: string
    email: string
    password: string
    role: Role
  }) => AuthResult
  logout: () => void
  updateProfile: (data: Partial<Pick<User, "firstName" | "lastName" | "email">>) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS)
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(
    (email: string, _password: string): AuthResult => {
      const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
      if (!found) {
        return { ok: false, message: "Aucun compte ne correspond à cet email." }
      }
      setUser(found)
      return { ok: true }
    },
    [users],
  )

  const register = useCallback<AuthContextValue["register"]>(
    (data) => {
      const email = data.email.trim().toLowerCase()
      if (users.some((u) => u.email.toLowerCase() === email)) {
        return { ok: false, message: "Un compte existe déjà avec cet email." }
      }
      const newUser: User = {
        id: `u-${Date.now()}`,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email,
        role: data.role,
      }
      setUsers((prev) => [...prev, newUser])
      setUser(newUser)
      return { ok: true }
    },
    [users],
  )

  const logout = useCallback(() => setUser(null), [])

  const updateProfile = useCallback<AuthContextValue["updateProfile"]>((data) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...data }
      setUsers((list) => list.map((u) => (u.id === prev.id ? { ...u, ...data } : u)))
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ user, users, login, register, logout, updateProfile }),
    [user, users, login, register, logout, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider")
  return ctx
}

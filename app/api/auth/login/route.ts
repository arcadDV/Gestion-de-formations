import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

async function getOrCreateProfile(
  userId: string,
  email: string,
  meta: { firstName?: string; lastName?: string; role?: string },
) {
  const existing = await prisma.user.findUnique({ where: { id: userId } })
  if (existing) return existing

  return prisma.user.create({
    data: {
      id: userId,
      email,
      firstName: meta.firstName || "Utilisateur",
      lastName: meta.lastName || "",
      role: meta.role === "admin" ? "admin" : "student",
    },
  })
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 })
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: String(email).trim().toLowerCase(),
    password: String(password),
  })

  if (error || !data.user) {
    return NextResponse.json(
      { error: error?.message ?? "Identifiants incorrects." },
      { status: 401 },
    )
  }

  const meta = data.user.user_metadata ?? {}
  let profile = null

  try {
    profile = await getOrCreateProfile(data.user.id, data.user.email ?? email, {
      firstName: meta.firstName,
      lastName: meta.lastName,
      role: meta.role,
    })
  } catch {
    profile = {
      id: data.user.id,
      email: data.user.email ?? email,
      firstName: meta.firstName || "Utilisateur",
      lastName: meta.lastName || "",
      role: meta.role === "admin" ? "admin" : "student",
    }
  }

  return NextResponse.json({ user: data.user, profile })
}

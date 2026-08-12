import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser()

  if (!supabaseUser) {
    return NextResponse.json({ user: null })
  }

  const meta = supabaseUser.user_metadata ?? {}

  try {
    let user = await prisma.user.findUnique({ where: { id: supabaseUser.id } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: supabaseUser.id,
          email: supabaseUser.email ?? "",
          firstName: meta.firstName || "Utilisateur",
          lastName: meta.lastName || "",
          role: meta.role === "admin" ? "admin" : "student",
        },
      })
    }

    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({
      user: {
        id: supabaseUser.id,
        email: supabaseUser.email ?? "",
        firstName: meta.firstName || "Utilisateur",
        lastName: meta.lastName || "",
        role: meta.role === "admin" ? "admin" : "student",
      },
    })
  }
}

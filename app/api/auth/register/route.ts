import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const firstName = String(body.firstName ?? "").trim()
  const lastName = String(body.lastName ?? "").trim()
  const email = String(body.email ?? "").trim().toLowerCase()
  const password = String(body.password ?? "")
  const role = body.role === "admin" ? "admin" : "student"

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Le mot de passe doit contenir au moins 6 caractères." },
      { status: 400 },
    )
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { firstName, lastName, role },
    },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (!data.user) {
    return NextResponse.json({ error: "Inscription impossible." }, { status: 400 })
  }

  let profile = null
  try {
    profile = await prisma.user.upsert({
      where: { id: data.user.id },
      update: { firstName, lastName, email, role },
      create: {
        id: data.user.id,
        email,
        firstName,
        lastName,
        role,
      },
    })
  } catch {
    profile = {
      id: data.user.id,
      email,
      firstName,
      lastName,
      role,
    }
  }

  const needsConfirmation = !data.session

  return NextResponse.json(
    {
      user: data.user,
      profile,
      needsConfirmation,
    },
    { status: 201 },
  )
}

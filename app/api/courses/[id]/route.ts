import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = await prisma.course.findUnique({ where: { id } })

  if (!course) {
    return NextResponse.json({ error: "Formation introuvable" }, { status: 404 })
  }

  return NextResponse.json(course)
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()

  const course = await prisma.course.update({
    where: { id },
    data: body,
  })

  return NextResponse.json(course)
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  await prisma.course.delete({ where: { id } })

  return NextResponse.json({ success: true })
}

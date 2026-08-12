import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const userId = searchParams.get("userId")
  const courseId = searchParams.get("courseId")

  const where: Record<string, unknown> = {}
  if (userId) where.userId = userId
  if (courseId) where.courseId = courseId

  const enrollments = await prisma.enrollment.findMany({
    where,
    include: { course: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(enrollments)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: body.userId, courseId: body.courseId } },
  })

  if (existing) {
    return NextResponse.json({ error: "Déjà inscrit à cette formation" }, { status: 409 })
  }

  const enrollment = await prisma.enrollment.create({
    data: {
      userId: body.userId,
      courseId: body.courseId,
    },
  })

  await prisma.course.update({
    where: { id: body.courseId },
    data: { students: { increment: 1 } },
  })

  return NextResponse.json(enrollment, { status: 201 })
}

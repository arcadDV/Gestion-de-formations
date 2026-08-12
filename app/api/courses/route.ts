import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const category = searchParams.get("category")
  const published = searchParams.get("published")

  const where: Record<string, unknown> = {}
  if (category) where.category = category
  if (published !== null) where.published = published === "true"

  const courses = await prisma.course.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(courses)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const course = await prisma.course.create({
    data: {
      title: body.title,
      description: body.description,
      longDescription: body.longDescription,
      category: body.category,
      level: body.level,
      duration: body.duration,
      price: body.price,
      modules: body.modules,
      image: body.image,
      published: body.published ?? false,
      instructor: body.instructor,
      objectives: body.objectives ?? [],
      skills: body.skills ?? [],
      demoVideo: body.demoVideo,
    },
  })

  return NextResponse.json(course, { status: 201 })
}

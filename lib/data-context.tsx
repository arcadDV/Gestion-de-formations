"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { INITIAL_COURSES, INITIAL_ENROLLMENTS } from "./mock-data"
import type { Course, Enrollment } from "./types"

export type CourseInput = Omit<Course, "id" | "students" | "rating" | "createdAt"> & {
  students?: number
  rating?: number
}

interface DataContextValue {
  courses: Course[]
  enrollments: Enrollment[]
  addCourse: (input: CourseInput) => Course
  updateCourse: (id: string, input: Partial<Course>) => void
  deleteCourse: (id: string) => void
  togglePublish: (id: string) => void
  enroll: (userId: string, courseId: string) => void
  isEnrolled: (userId: string, courseId: string) => boolean
  getCourse: (id: string) => Course | undefined
}

const DataContext = createContext<DataContextValue | null>(null)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES)
  const [enrollments, setEnrollments] = useState<Enrollment[]>(INITIAL_ENROLLMENTS)

  const addCourse = useCallback<DataContextValue["addCourse"]>((input) => {
    const course: Course = {
      ...input,
      id: `c-${Date.now()}`,
      students: input.students ?? 0,
      rating: input.rating ?? 0,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setCourses((prev) => [course, ...prev])
    return course
  }, [])

  const updateCourse = useCallback<DataContextValue["updateCourse"]>((id, input) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...input } : c)))
  }, [])

  const deleteCourse = useCallback<DataContextValue["deleteCourse"]>((id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id))
    setEnrollments((prev) => prev.filter((e) => e.courseId !== id))
  }, [])

  const togglePublish = useCallback<DataContextValue["togglePublish"]>((id) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, published: !c.published } : c)))
  }, [])

  const enroll = useCallback<DataContextValue["enroll"]>((userId, courseId) => {
    setEnrollments((prev) => {
      if (prev.some((e) => e.userId === userId && e.courseId === courseId)) return prev
      return [
        ...prev,
        {
          id: `e-${Date.now()}`,
          userId,
          courseId,
          progress: 0,
          createdAt: new Date().toISOString().slice(0, 10),
        },
      ]
    })
    setCourses((prev) => prev.map((c) => (c.id === courseId ? { ...c, students: c.students + 1 } : c)))
  }, [])

  const isEnrolled = useCallback<DataContextValue["isEnrolled"]>(
    (userId, courseId) => enrollments.some((e) => e.userId === userId && e.courseId === courseId),
    [enrollments],
  )

  const getCourse = useCallback<DataContextValue["getCourse"]>(
    (id) => courses.find((c) => c.id === id),
    [courses],
  )

  const value = useMemo(
    () => ({
      courses,
      enrollments,
      addCourse,
      updateCourse,
      deleteCourse,
      togglePublish,
      enroll,
      isEnrolled,
      getCourse,
    }),
    [courses, enrollments, addCourse, updateCourse, deleteCourse, togglePublish, enroll, isEnrolled, getCourse],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error("useData doit être utilisé dans DataProvider")
  return ctx
}

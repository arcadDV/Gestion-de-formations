export type Role = "admin" | "student"

export type Level = "Débutant" | "Intermédiaire" | "Avancé"

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
}

export interface Course {
  id: string
  title: string
  description: string
  longDescription: string
  category: string
  level: Level
  duration: string
  price: number
  modules: number
  image: string
  published: boolean
  students: number
  rating: number
  instructor: string
  objectives: string[]
  skills: string[]
  createdAt: string
  /** Only the demo course carries a video. */
  demoVideo?: string
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  progress: number
  createdAt: string
}

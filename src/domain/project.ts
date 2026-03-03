// src/domain/project.ts
/**
 * Domain models and types for the freelance board application.
 */
export type ProjectStatus =
  | "waiting"
  | "completed"
  | "proposal"
  | "inquiry"
  | "active"
  | "negotiation"

export type ProjectPriority = "low" | "medium" | "high"

export interface Project {
  id: string
  title: string
  client?: string
  budget?: number
  deadline?: Date
  status: ProjectStatus
  priority: ProjectPriority
  createdAt: Date
  updatedAt: Date
}

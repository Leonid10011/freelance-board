// src/domain/project.ts
/**
 * Domain models and types for the freelance board application.
 */
export const PROJECT_STATUSES = [
  "waiting",
  "completed",
  "proposal",
  "inquiry",
  "active",
  "negotiation",
] as const
export const PROJECT_PRIORITIES = ["low", "medium", "high"] as const

// Der Typ wird automatisch: "waiting" | "completed" | ...
export type ProjectStatus = (typeof PROJECT_STATUSES)[number]

// Die Anzahl ist zur Laufzeit und statisch verfügbar
export const projectStatusCount = PROJECT_STATUSES.length // 6
export const projectPriorityCount = PROJECT_PRIORITIES.length // 3

export type ProjectPriority = (typeof PROJECT_PRIORITIES)[number] // "low" | "medium" | "high"

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

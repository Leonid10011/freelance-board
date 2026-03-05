// src/domain/project.ts
/**
 * Domain models and types for the freelance board application.
 */
const statuses = ["waiting", "completed", "proposal", "inquiry", "active", "negotiation"] as const;

// Der Typ wird automatisch: "waiting" | "completed" | ...
export type ProjectStatus = typeof statuses[number];

// Die Anzahl ist zur Laufzeit und statisch verfügbar
export const projectStatusCount = statuses.length; // 6

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
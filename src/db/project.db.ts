// src/domain/project.ts
/**
 * Database schema and types for the freelance board application.
 */
import { ProjectPriority, ProjectStatus } from "@/domain/project"

export interface ProjectRow {
  id: string
  title: string
  client: string | null
  budget: number | null
  deadline: string | null // Store as ISO string for easier serialization
  status: ProjectStatus
  priority: ProjectPriority
  createdAt: string // Store as ISO string
  updatedAt: string // Store as ISO string
}

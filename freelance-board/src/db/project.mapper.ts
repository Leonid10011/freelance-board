import { Project } from "@/domain/project"
import { ProjectRow } from "./project.db"

export function projectRowToDomain(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    client: row.client || undefined,
    budget: row.budget || undefined,
    deadline: row.deadline ? new Date(row.deadline) : undefined,
    status: row.status,
    priority: row.priority,
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
  }
}

export function projectDomainToRowInput(
  p: Omit<Project, "createdAt" | "updatedAt">,
): Partial<ProjectRow> {
  return {
    id: p.id,
    title: p.title,
    client: p.client ?? null,
    budget: p.budget ?? null,
    deadline: p.deadline ? p.deadline.toISOString() : null,
    status: p.status,
    priority: p.priority,
  }
}

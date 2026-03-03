// src/db/repo.ts
/**
 * Repository functions for accessing and manipulating project data in the database.
 */
import { Project, ProjectPriority, ProjectStatus } from "@/domain/project"

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Build a website",
    client: "Acme Corp",
    budget: 5000,
    deadline: new Date("2024-12-31"),
    status: "active",
    priority: "high",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function listProjects(): Promise<Project[]> {
  return mockProjects
}

export type CreateProjectInput = {
  title: string
  client?: string
  budget?: number
  deadline?: Date
  status: ProjectStatus
  priority: ProjectPriority
}

export async function CreateProject(
  _input: CreateProjectInput,
): Promise<Project> {
  throw new Error("Not implemented")
}

export type UpdateProjectInput = Partial<CreateProjectInput>

export async function UpdateProject(
  _id: string,
  _input: UpdateProjectInput,
): Promise<Project> {
  throw new Error("Not implemented")
}

export async function DeleteProject(_id: string): Promise<void> {
  throw new Error("Not implemented")
}

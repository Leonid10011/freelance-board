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
  status?: ProjectStatus
  priority?: ProjectPriority
}

/**
 * Temporary implementation that creates a new project and adds it to the in-memory array. In a real implementation, this would insert into the database.
 */
export async function createProject(
  input: CreateProjectInput,
): Promise<Project> {
  const newProject: Project = {
    id: crypto.randomUUID(),
    title: input.title,
    client: input.client,
    budget: input.budget,
    deadline: input.deadline,
    status: input.status ?? "inquiry",
    priority: input.priority ?? "medium",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockProjects.push(newProject)
  return newProject
}

export type UpdateProjectInput = Partial<CreateProjectInput>

export async function updateProject(
  _id: string,
  _input: UpdateProjectInput,
): Promise<Project> {
  throw new Error("Not implemented")
}

export async function deleteProject(_id: string): Promise<void> {
  throw new Error("Not implemented")
}

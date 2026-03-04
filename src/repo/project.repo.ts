// src/db/repo.ts
/**
 * Repository functions for accessing and manipulating project data in the database.
 */
import { projectRowToDomain } from "@/db/project.mapper"
import { createSupabaseBrowserClient } from "@/db/supabase.client"
import { Project, ProjectPriority, ProjectStatus } from "@/domain/project"

const supabase = createSupabaseBrowserClient()

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
export async function createProject(input: Project): Promise<Project> {
  const supabase = createSupabaseBrowserClient()

  const { data: authData, error: authError } = await supabase.auth.getSession()
  if (authError || !authData.session) {
    console.error("Error getting auth session:", authError)
    throw new Error(authError?.message || "Failed to get auth session")
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: input.title,
      client: input.client ?? null,
      budget: input.budget ?? null,
      deadline: input.deadline
        ? input.deadline.toISOString().slice(0, 10)
        : null,
      status: input.status || "inquiry",
      priority: input.priority || "medium",
      is_demo: true, // Mark this project as a demo project
    })
    .select()
    .single()

  if (error) {
    console.error("Error inserting project:", error)
    throw new Error(error.message)
  }

  return projectRowToDomain(data)
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

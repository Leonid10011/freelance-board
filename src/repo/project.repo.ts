// src/db/repo.ts
/**
 * Repository functions for accessing and manipulating project data in the database.
 */
import { projectRowToDomain } from "@/db/project.mapper"
import { toProjectUpdatePatch } from "@/db/project.repo"
import { createSupabaseBrowserClient } from "@/db/supabase.client"
import { Project, ProjectPriority, ProjectStatus } from "@/domain/project"
import {
  CreateProjectValidated,
  UpdateProjectValidated,
} from "@/validation/project.schema"

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

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase.from("projects").select("*").limit(10)
  if (error) {
    console.error("Error fetching projects:", error)
    throw new Error(error.message)
  } else {
    return data.map(projectRowToDomain)
  }
}

export type CreateProjectInput = {
  title: string
  client?: string
  budget?: number
  deadline?: Date
  status?: ProjectStatus
  priority?: ProjectPriority
}

export async function createProject(
  input: CreateProjectValidated,
): Promise<Project> {
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
  _input: UpdateProjectValidated,
): Promise<Project> {
  const { data: authData, error: authError } = await supabase.auth.getSession()
  if (authError || !authData.session) {
    console.error("Error getting auth session:", authError)
    throw new Error(authError?.message || "Failed to get auth session")
  } else {
    const patch = toProjectUpdatePatch(_input)
    console.log("Generated patch for update:", patch)
    const { data, error } = await supabase
      .from("projects")
      .update(patch)
      .eq("id", _id)
      .select()
      .single()

    return projectRowToDomain(data)
  }
}

export async function deleteProject(_id: string): Promise<void> {
  const { data: authData, error: authError } = await supabase.auth.getSession()
  if (authError || !authData.session) {
    console.error("Error getting auth session:", authError)
    throw new Error(authError?.message || "Failed to get auth session")
  } else {
    const { error } = await supabase.from("projects").delete().eq("id", _id)
    if (error) {
      console.error("Error deleting project:", error)
      throw new Error(error.message)
    }
  }
}

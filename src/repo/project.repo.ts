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

export type ProjectRepoErrorCode =
  | "AUTH_REQUIRED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION"
  | "UNKNOWN"

export class ProjectRepoError extends Error {
  constructor(
    public code: ProjectRepoErrorCode,
    message: string,
    public cause?: unknown,
  ) {
    super(message)
    this.name = "ProjectRepoError"
  }
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
    throw new ProjectRepoError(
      "AUTH_REQUIRED",
      authError?.message || "Authentication required",
      authError,
    )
  }

  const { data, error, status } = await supabase
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
    // RLS / permission denied
    if (status === 403 || error.code === "42501") {
      throw new ProjectRepoError(
        "FORBIDDEN",
        "No permission to update project",
        error,
      )
    }
    throw new ProjectRepoError("UNKNOWN", error.message, error)
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
    throw new ProjectRepoError(
      "AUTH_REQUIRED",
      authError?.message || "Authentication required",
      authError,
    )
  }

  const patch = toProjectUpdatePatch(_input)

  const { data, error, status } = await supabase
    .from("projects")
    .update(patch)
    .eq("id", _id)
    .select()
    .single()

  if (error) {
    // RLS / permission denied
    if (status === 403 || error.code === "42501") {
      throw new ProjectRepoError(
        "FORBIDDEN",
        "No permission to update project",
        error,
      )
    }

    // Not found / no row returned by single()
    if (status === 404 || status === 406 || error.code === "PGRST116") {
      throw new ProjectRepoError("NOT_FOUND", "Project not found", error)
    }

    throw new ProjectRepoError("UNKNOWN", error.message, error)
  }

  return projectRowToDomain(data)
}

export async function deleteProject(_id: string): Promise<void> {
  const { data: authData, error: authError } = await supabase.auth.getSession()
  if (authError || !authData.session) {
    throw new ProjectRepoError(
      "AUTH_REQUIRED",
      authError?.message || "Failed to get auth session",
      authError,
    )
  } else {
    const { error } = await supabase.from("projects").delete().eq("id", _id)
    if (error) {
      console.error("Error deleting project:", error)
      throw new ProjectRepoError("UNKNOWN", error.message, error)
    }
  }
}

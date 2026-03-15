import { Project } from "@/domain/project"
import { CreateInput, UpdateData, UpdateId } from "./types"

export function getProjectsFromLocalStorage(): Project[] {
  if (typeof window === "undefined") {
    return []
  }
  const raw = localStorage.getItem("demo-projects")
  const projects: Project[] = raw ? JSON.parse(raw) : []
  return projects
}

export async function saveProjectToLocalStorage(data: CreateInput) {
  const project: Project = {
    id: crypto.randomUUID(),
    client: data.client,
    budget: Number(data.budget) || 0,
    deadline: data.deadline ? new Date(data.deadline) : undefined,
    status: data.status,
    priority: data.priority,
    title: data.title,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const raw = localStorage.getItem("demo-projects")
  const projects: Project[] = raw ? JSON.parse(raw) : []
  projects.push(project)
  localStorage.setItem("demo-projects", JSON.stringify(projects))

  return project
}

export async function updateProjectInLocalStorage(
  id: UpdateId,
  data: UpdateData,
) {
  const raw = localStorage.getItem("project-demo")
  const list: Project[] = raw ? JSON.parse(raw) : []
  const updatedList = list.map((p) =>
    p.id === id
      ? {
          ...p,
          ...data,
          title: data.title || p.title,
          client: data.client || p.client,
          budget: data.budget !== undefined ? Number(data.budget) : p.budget,
          deadline:
            data.deadline !== undefined
              ? data.deadline
                ? new Date(data.deadline)
                : p.deadline
              : undefined,
          status: data.status || p.status,
          priority: data.priority || p.priority,
          updatedAt: new Date(),
        }
      : p,
  )

  localStorage.setItem("project-demo", JSON.stringify(updatedList))
  const updatedItem = updatedList.find((p) => p.id === id)

  if (!updatedItem) {
    // todo implement error handling
    throw new Error("Project now found")
  }

  return updatedItem
}

import { Project } from "@/domain/project"
import { createProject, updateProject } from "./project.repo"

type CreateInput = Parameters<typeof createProject>[0]
type UpdateId = Parameters<typeof updateProject>[0]
type UpdateData = Parameters<typeof updateProject>[1]

export type ProjectGateway = {
  create: (data: CreateInput) => Promise<Project>
  update: (id: UpdateId, data: UpdateData) => Promise<Project>
}

const liveGateway: ProjectGateway = {
  create: (data) => createProject(data),
  update: (id, data) => updateProject(id, data),
}

const demoGateway: ProjectGateway = {
  async create(data) {
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
  },

  async update(id, data) {
    const raw = localStorage.getItem("demo-projects")
    const list: Project[] = raw ? JSON.parse(raw) : []
    const next = list.map((p) =>
      p.id === id
        ? {
            ...p,
            ...data,
            title: data.title || p.title,
            client: data.client !== undefined ? data.client : p.client,
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
    localStorage.setItem("demo-projects", JSON.stringify(next))
    const updated = next.find((p) => p.id === id)
    if (!updated) {
      throw new Error("Project not found")
    }

    return updated
  },
}

export function createProjectGateway(mode: "live" | "demo"): ProjectGateway {
  return mode === "live" ? liveGateway : demoGateway
}

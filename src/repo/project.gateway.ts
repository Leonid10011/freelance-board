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

    return project
  },
  async update(id, data) {
    const project: Project = {
      id,
      client: data.client || "Demo Client",
      budget: Number(data.budget) || 0,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
      status: data.status || "waiting",
      priority: data.priority || "medium",
      title: data.title || "Demo Project",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    return project
  },
}

export function createProjectGateway(mode: "live" | "demo"): ProjectGateway {
  return mode === "live" ? liveGateway : demoGateway
}

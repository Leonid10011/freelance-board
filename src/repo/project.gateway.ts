import { Project } from "@/domain/project"
import { createProject, deleteProject, updateProject } from "./project.repo"
import { CreateInput, DeleteId, UpdateData, UpdateId } from "./types"
import {
  deleteProjectFromLocalStorage,
  saveProjectToLocalStorage,
  updateProjectInLocalStorage,
} from "./project.demo"

export type ProjectGateway = {
  create: (data: CreateInput) => Promise<Project>
  update: (id: UpdateId, data: UpdateData) => Promise<Project>
  delete: (id: DeleteId) => Promise<void>
}

const liveGateway: ProjectGateway = {
  create: (data) => createProject(data),
  update: (id, data) => updateProject(id, data),
  delete: (id) => deleteProject(id),
}

const demoGateway: ProjectGateway = {
  create: (data) => saveProjectToLocalStorage(data),
  update: (id, data) => updateProjectInLocalStorage(id, data),
  delete: (id) => deleteProjectFromLocalStorage(id),
}

export function createProjectGateway(mode: "live" | "demo"): ProjectGateway {
  return mode === "live" ? liveGateway : demoGateway
}

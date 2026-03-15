import { Project } from "@/domain/project"
import { createProject, updateProject } from "./project.repo"
import { CreateInput, UpdateData, UpdateId } from "./types"
import {
  saveProjectToLocalStorage,
  updateProjectInLocalStorage,
} from "./project.demo"

export type ProjectGateway = {
  create: (data: CreateInput) => Promise<Project>
  update: (id: UpdateId, data: UpdateData) => Promise<Project>
}

const liveGateway: ProjectGateway = {
  create: (data) => createProject(data),
  update: (id, data) => updateProject(id, data),
}

const demoGateway: ProjectGateway = {
  create: (data) => saveProjectToLocalStorage(data),
  update: (id, data) => updateProjectInLocalStorage(id, data),
}

export function createProjectGateway(mode: "live" | "demo"): ProjectGateway {
  return mode === "live" ? liveGateway : demoGateway
}

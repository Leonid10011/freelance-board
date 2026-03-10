import { Project } from "@/domain/project"

export function getProjectsFromLocalStorage(): Project[] {
  if (typeof window === "undefined") {
    return []
  }
  const raw = localStorage.getItem("demo-projects")
  const projects: Project[] = raw ? JSON.parse(raw) : []
  return projects
}

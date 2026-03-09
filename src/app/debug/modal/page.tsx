import { Project } from "@/domain/project"
import { getProjects } from "@/repo/project.repo"
import DebugModal from "./DebugModal"

export default async function DebugModalPage() {
  const initialProjects: Project[] = await getProjects()

  return <DebugModal p={initialProjects} />
}

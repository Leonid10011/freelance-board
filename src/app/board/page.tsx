import { Project } from "@/domain/project"
import { getProjects } from "@/repo/project.repo"
import BoardPageClient from "./BoardPageClient"

export default async function Home() {
  /* Load inital data and preferences here, then pass them down to Board */
  const initialProjects: Project[] = await getProjects()

  return <BoardPageClient initialProjects={initialProjects} />
}

import Board from "@/components/Board"
import { Project } from "@/domain/project"
import { listProjects } from "@/repo/project.repo"

export default async function Home() {
  /* Load inital data and preferences here, then pass them down to Board */
  const initialProjects: Project[] = await listProjects()

  return (
    <>
      <Board initialProjects={initialProjects} />
    </>
  )
}

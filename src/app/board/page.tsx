import Board from "@/components/Board"
import { Project } from "@/domain/project"
import { getProjects } from "@/repo/project.repo"

export default async function Home() {
  /* Load inital data and preferences here, then pass them down to Board */
  const initialProjects: Project[] = await getProjects()

  return (
    <>
      <Board initialProjects={initialProjects} />
    </>
  )
}

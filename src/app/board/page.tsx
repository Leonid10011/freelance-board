import Board from "@/components/Board"
import { Project } from "@/domain/project"
import { getProjects } from "@/repo/project.repo"

export default async function Home() {
  /* Load inital data and preferences here, then pass them down to Board */
  const initialProjects: Project[] = await getProjects()

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-[1600px] h-full px-4 py-6 md:px-4 md:py-8">
        <h1 className="text-2xl font-bold">Freelance Board</h1>
        <div className="mt-4 h-full">
          <Board mode="live" initialProjects={initialProjects} />
        </div>
      </div>
    </div>
  )
}

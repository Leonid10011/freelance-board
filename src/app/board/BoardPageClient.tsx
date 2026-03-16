"use client"
import Board from "@/components/Board"
import { useAppModeContext } from "@/context/AppModeContext"
import { Project } from "@/domain/project"
import { useEffect } from "react"

export default function BoardPageClient({
  initialProjects,
}: {
  initialProjects: Project[]
}) {
  const { handleModeChange } = useAppModeContext()

  useEffect(() => {
    handleModeChange?.("live")
  }, [handleModeChange])

  return (
    <div className="min-h-screen h-full">
      <div className="mx-auto w-full max-w-[1600px] h-full px-4 py-6 md:px-4 md:py-8">
        <h1 className="text-2xl font-bold">Freelance Board</h1>
        <div className="mt-4 h-full">
          <Board initialProjects={initialProjects} />
        </div>
      </div>
    </div>
  )
}

"use client"

import Board from "@/components/Board"
import { useAppModeContext } from "@/context/AppModeContext"
import { Project } from "@/domain/project"
import { getProjectsFromLocalStorage } from "@/repo/project.demo"
import { useEffect, useState } from "react"

export default function Home() {
  /* Load inital data and preferences here, then pass them down to Board */
  const [initialProjects] = useState<Project[]>(() =>
    getProjectsFromLocalStorage(),
  )

  const { handleModeChange } = useAppModeContext()
  useEffect(() => {
    handleModeChange?.("demo")
  }, [handleModeChange])

  return (
    <div className="min-h-screen h-full">
      <div className="mx-auto w-full h-full max-w-[1600px] px-4 py-6 md:px-4 md:py-8">
        <h1 className="text-2xl font-bold">DEMO Freelance Board</h1>
        <div className=" h-full mt-4">
          <Board initialProjects={initialProjects} />
        </div>
      </div>
    </div>
  )
}

"use client"

import Board from "@/components/Board"
import { Project } from "@/domain/project"
import { getProjectsFromLocalStorage } from "@/repo/project.demo"
import { useState } from "react"

export default function Home() {
  /* Load inital data and preferences here, then pass them down to Board */
  const [initialProjects] = useState<Project[]>(() =>
    getProjectsFromLocalStorage(),
  )

  return (
    <div className="flex min-h-screen h-full flex-col">
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 min-h-0 flex-col px-4 py-6 md:px-4 md:py-8">
        <h1 className="text-2xl font-bold">DEMO Freelance Board</h1>
        <div className="mt-4 flex-1 min-h-0">
          <Board initialProjects={initialProjects} />
        </div>
      </div>
    </div>
  )
}

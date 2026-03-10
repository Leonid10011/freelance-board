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
    <>
      <Board initialProjects={initialProjects} />
    </>
  )
}

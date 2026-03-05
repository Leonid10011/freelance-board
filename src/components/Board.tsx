"use client"

import { ProjectStatus } from "@/domain/project"
import { useBoardPreferences } from "./board/useBoardPreferences"
import StatusFilterBar from "./StatusFiterBar"
import { useEffect, useMemo } from "react"

const STATUS_ORDER: ProjectStatus[] = [
  "inquiry",
  "proposal",
  "negotiation",
  "active",
  "waiting",
  "completed",
]

type BoardProps = {
  // initialProjects: Project[]
}

export default function Board({}: BoardProps) {
  const { prefs, toggleStatus } = useBoardPreferences()

  const visibleStatuses = useMemo(() => {
    console.log(
      "[visibleStatuses] Calculating visibleStatuses with prefs:",
      prefs.visibleStatuses,
    )
    return STATUS_ORDER.filter((status) => prefs.visibleStatuses[status])
  }, [prefs.visibleStatuses])

  return (
    <>
      <div className="flex flex-col h-screen w-screen items-center justify-center p-16">
        <h1 className="text-2xl font-bold">Freelance Board</h1>
        <StatusFilterBar
          statuses={STATUS_ORDER}
          visibleStatuses={visibleStatuses}
          toggleStatus={toggleStatus}
        />
      </div>
    </>
  )
}

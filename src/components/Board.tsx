"use client"

import { ProjectStatus } from "@/domain/project"
import { useBoardPreferences } from "./board/useBoardPreferences"
import StatusFilterBar from "./StatusFiterBar"
import { useEffect, useMemo } from "react"
import ViewSidebar from "./ViewSidebar"

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
  const { prefs, toggleStatus, toggleCardField } = useBoardPreferences()

  const visibleStatuses = useMemo(() => {
    console.log(
      "[visibleStatuses] Calculating visibleStatuses with prefs:",
      prefs.visibleStatuses,
    )
    return STATUS_ORDER.filter((status) => prefs.visibleStatuses[status])
  }, [prefs.visibleStatuses])

  return (
    <div className="h-screen w-screen overflow-hidden">
      <header className="border-b px-6 py-4 height-16">
        <div className="flex flex-col items-start justify-between">
          <h1 className="text-2xl font-bold">Freelance Board</h1>
          <StatusFilterBar
            statuses={STATUS_ORDER}
            visibleStatuses={visibleStatuses}
            toggleStatus={toggleStatus}
          />
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)] overflow-x-auto">
        <main className="flex-1 overflow-x-auto overflow-y-hidden p-6"></main>
        <aside className="w-80 border-l p-6">
          <ViewSidebar
            visibleCardFields={prefs.visibleCardFields}
            toggleCardField={toggleCardField}
          />
        </aside>
      </div>
    </div>
  )
}

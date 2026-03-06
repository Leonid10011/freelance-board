"use client"

import { Project, ProjectStatus } from "@/domain/project"
import { useBoardPreferences } from "./board/useBoardPreferences"
import StatusFilterBar from "./StatusFiterBar"
import { useMemo } from "react"
import ViewSidebar from "./ViewSidebar"
import Column from "./Column"

const STATUS_ORDER: ProjectStatus[] = [
  "inquiry",
  "proposal",
  "negotiation",
  "active",
  "waiting",
  "completed",
]

type BoardProps = {
  initialProjects: Project[]
}

export default function Board({ initialProjects }: BoardProps) {
  const { prefs, toggleStatus, toggleCardField } = useBoardPreferences()

  const exampleProject: Project = {
    id: "proj-001",
    title: "Landingpage Redesign",
    client: "Muster GmbH",
    budget: 3500,
    deadline: new Date("2026-04-15"),
    status: "proposal",
    priority: "high",
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-03-06"),
  }

  const visibleStatuses = useMemo(() => {
    console.log(
      "[visibleStatuses] Calculating visibleStatuses with prefs:",
      prefs.visibleStatuses,
    )
    return STATUS_ORDER.filter((status) => prefs.visibleStatuses[status])
  }, [prefs.visibleStatuses])

  const visibleCardFields = useMemo(() => {
    console.log(
      "[visibleCardFields] Calculating visibleCardFields with prefs:",
      prefs.visibleCardFields,
    )
    return prefs.visibleCardFields
  }, [prefs.visibleCardFields])

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

      <div className="flex h-[calc(100vh-4rem)] w-full overflow-x-auto justify-between">
        <main className="flex flex-row overflow-x-auto overflow-y-hidden p-6 gap-4">
          {visibleStatuses.map((status) => (
            <Column
              key={status}
              projects={initialProjects.filter(
                (project) => project.status === status,
              )}
              visibleCardFields={visibleCardFields}
              projectCount={
                initialProjects.filter((project) => project.status === status)
                  .length
              }
              status={status}
            />
          ))}
        </main>
        <aside className="w-80 shrink-0 border-l p-6">
          <ViewSidebar
            visibleCardFields={visibleCardFields}
            toggleCardField={toggleCardField}
          />
        </aside>
      </div>
    </div>
  )
}

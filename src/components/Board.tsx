"use client"

import { Project, ProjectStatus } from "@/domain/project"
import { useBoardPreferences } from "./board/useBoardPreferences"
import StatusFilterBar from "./StatusFilterBar"
import { useEffect, useMemo, useRef, useState } from "react"
import ViewSidebar from "./ViewSidebar"
import Column from "./Column"
import CreateProjectModal from "./projectModal/CreateProjectModal"
import UpdateProjectModal from "./projectModal/UpdateProjectModal"
import { PanelRightOpen } from "lucide-react"
import { useProjectActions } from "@/hooks/useProjectActions"
import { useAppModeContext } from "@/context/AppModeContext"

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
  const { mode } = useAppModeContext()

  const [isProjectModalShellOpen, setIsProjectModalShellOpen] = useState(false)
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false)
  const [initialStatus, setInitialStatus] = useState<ProjectStatus>("inquiry")
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [projectToEdit, setProjectToEdit] = useState<Project>()
  const [isSideBarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768
    }
    return true
  })

  const { handleStatusChange } = useProjectActions({ mode })

  const toggleSidebar = () => setIsSidebarOpen((current) => !current)

  const closeProjectModalShell = () => setIsProjectModalShellOpen(false)
  const closeEditProjectModal = () => setIsEditProjectModalOpen(false)

  const handleProjectStatusChange = (
    projectId: string,
    newStatus: ProjectStatus,
  ) => {
    handleStatusChange(projectId, newStatus)

    setProjects((currentProjects) =>
      currentProjects.map((project) => {
        if (project.id !== projectId) {
          return project
        }

        return {
          ...project,
          status: newStatus,
          updatedAt: new Date(),
        }
      }),
    )
  }

  const handleAddProject = (newProject: Project) => {
    setProjects((currentProjects) => [...currentProjects, newProject])
  }

  const handleDeleteProject = (projectId: string) => {
    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.id !== projectId),
    )
  }

  const handleEditProject = (editedProject: Project) => {
    setIsEditProjectModalOpen(true)
    setProjectToEdit(editedProject)

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === editedProject.id ? editedProject : project,
      ),
    )
  }

  const visibleStatuses = useMemo(() => {
    return STATUS_ORDER.filter((status) => prefs.visibleStatuses[status])
  }, [prefs.visibleStatuses])

  const visibleCardFields = useMemo(() => {
    return prefs.visibleCardFields
  }, [prefs.visibleCardFields])

  const projectByStatus = useMemo(() => {
    const map: Record<ProjectStatus, Project[]> = {
      inquiry: [],
      proposal: [],
      negotiation: [],
      active: [],
      waiting: [],
      completed: [],
    }

    projects.forEach((project) => {
      map[project.status].push(project)
    })

    return map
  }, [projects])

  const dragRef = useRef<HTMLDivElement | null>(null)
  const startXRef = useRef(0)
  const startScrollLeftRef = useRef(0)
  const draggingRef = useRef(false)

  useEffect(() => {
    const container = dragRef.current
    if (!container) return
    console.log("test")
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current) return
      document.body.style.userSelect = "none"
      const xDiff = e.clientX - startXRef.current
      container.scrollLeft = startScrollLeftRef.current - xDiff
    }

    const handleMouseUp = (e: MouseEvent) => {
      draggingRef.current = false

      document.body.classList.remove("nodrag-cursor")
      document.body.classList.remove("nonselect")

      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }

    const handleMouseLeave = (e: MouseEvent) => {
      draggingRef.current = false

      document.body.classList.remove("nodrag-cursor")
      document.body.classList.remove("nonselect")

      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return
      draggingRef.current = true
      startXRef.current = e.clientX
      startScrollLeftRef.current = container.scrollLeft

      document.body.classList.add("nonselect")
      document.body.classList.add("nodrag-cursor")

      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("mouseleave", handleMouseLeave)
    }

    container.addEventListener("mousedown", handleMouseDown)

    return () => {
      container.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  return (
    <div className="flex w-full min-h-[32rem] min-h-full flex-row overflow-x-hidden rounded-xl bg-board max-md:min-h-[24rem] max-md:min-h-full max-md:rounded-none">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="px-6 py-4 max-md:px-3 max-md:py-3">
          <div className="flex flex-col items-start justify-between">
            <StatusFilterBar
              statuses={STATUS_ORDER}
              visibleStatuses={visibleStatuses}
              toggleStatus={toggleStatus}
            />
          </div>
        </header>
        <main
          ref={dragRef}
          className="flex flex-row h-full  gap-4 overflow-x-auto p-6 max-md:flex-col max-md:gap-3 max-md:p-3 "
        >
          {visibleStatuses.map((status) => (
            <Column
              onEditProject={handleEditProject}
              key={status}
              projects={projectByStatus[status]}
              visibleCardFields={visibleCardFields}
              projectCount={projectByStatus[status].length}
              status={status}
              availableStatuses={STATUS_ORDER}
              onProjectStatusChange={handleProjectStatusChange}
              setModalOpen={setIsProjectModalShellOpen}
              setInitialStatus={setInitialStatus}
            />
          ))}
        </main>
      </div>
      <div
        className={`relative shrink-0 overflow-hidden transition-[width] duration-300 ease-out  ${
          isSideBarOpen ? "w-[220px]" : "w-12 max-md:w-10"
        }`}
      >
        {!isSideBarOpen && (
          <button
            type="button"
            aria-label="Open sidebar"
            className="absolute right-2 top-10 z-20 p-1 rounded-md text-muted transition hover:bg-muted/20 hover:cursor-pointer"
            onClick={toggleSidebar}
          >
            <PanelRightOpen className="h-6 w-6" />
          </button>
        )}

        <aside
          className={`h-full w-[220px] border-l pt-6 shadow-[inset_4px_0_12px_rgba(15,23,42,0.04)] transition-transform duration-300 ease-out ${
            isSideBarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ViewSidebar
            visibleCardFields={visibleCardFields}
            toggleCardField={toggleCardField}
            toggleSidebar={toggleSidebar}
          />
        </aside>
      </div>
      {isProjectModalShellOpen && (
        <CreateProjectModal
          onClose={closeProjectModalShell}
          initialStatus={initialStatus}
          onSave={handleAddProject}
        />
      )}
      {isEditProjectModalOpen && projectToEdit && (
        <UpdateProjectModal
          onClose={closeEditProjectModal}
          // You would need to pass the project to be edited here
          // For example, you could have a state variable like `projectToEdit` and pass it here
          project={projectToEdit}
          onUpdate={handleEditProject}
          onDelete={handleDeleteProject}
        />
      )}
    </div>
  )
}

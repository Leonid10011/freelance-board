"use client"

import { Project, ProjectStatus } from "@/domain/project"
import { useBoardPreferences } from "./board/useBoardPreferences"
import StatusFilterBar from "./StatusFilterBar"
import { useMemo, useState } from "react"
import ViewSidebar from "./ViewSidebar"
import Column from "./Column"
import CreateProjectModal from "./projectModal/CreateProjectModal"
import UpdateProjectModal from "./projectModal/UpdateProjectModal"
import { PanelRightOpen } from "lucide-react"

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
  const [isProjectModalShellOpen, setIsProjectModalShellOpen] = useState(false)
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false)
  const [initialStatus, setInitialStatus] = useState<ProjectStatus>("inquiry")
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [projectToEdit, setProjectToEdit] = useState<Project>()
  const [isSideBarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => setIsSidebarOpen((current) => !current)

  const closeProjectModalShell = () => setIsProjectModalShellOpen(false)
  const closeEditProjectModal = () => setIsEditProjectModalOpen(false)

  const handleProjectStatusChange = (
    projectId: string,
    newStatus: ProjectStatus,
  ) => {
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

  return (
    <div className="flex w-full min-h-[32rem] flex-row overflow-x-hidden rounded-xl bg-board max-md:min-h-[24rem] max-md:rounded-none">
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
        <main className="flex flex-row gap-4 overflow-x-auto p-6 max-md:flex-col max-md:gap-3 max-md:p-3 ">
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
        />
      )}
    </div>
  )
}

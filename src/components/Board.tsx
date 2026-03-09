"use client"

import { Project, ProjectStatus } from "@/domain/project"
import { useBoardPreferences } from "./board/useBoardPreferences"
import StatusFilterBar from "./StatusFilterBar"
import { useMemo, useState } from "react"
import ViewSidebar from "./ViewSidebar"
import Column from "./Column"
import CreateProjectModal from "./projectModal/CreateProjectModal"
import UpdateProjectModal from "./projectModal/UpdateProjectModal"

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
        <aside className="w-80 shrink-0 border-l p-6">
          <ViewSidebar
            visibleCardFields={visibleCardFields}
            toggleCardField={toggleCardField}
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

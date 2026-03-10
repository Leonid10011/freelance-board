import { Project, ProjectStatus } from "@/domain/project"
import { VisibleCardFields } from "./board/types"
import { CirclePlus } from "lucide-react"
import ProjectCard from "./ProjectCard"

export default function Column({
  projects,
  visibleCardFields,
  projectCount,
  status,
  availableStatuses,
  onProjectStatusChange,
  setModalOpen,
  setInitialStatus,
  onEditProject,
}: {
  projects: Project[]
  visibleCardFields: VisibleCardFields
  projectCount: number
  status: ProjectStatus
  availableStatuses: ProjectStatus[]
  onProjectStatusChange: (projectId: string, newStatus: ProjectStatus) => void
  setModalOpen: (isOpen: boolean) => void
  setInitialStatus: (status: ProjectStatus) => void
  onEditProject: (project: Project) => void
}) {
  const handleAddProject = () => {
    /*TODO: Open a modal to create a new project with status = project.status
        - Pre-fill the status field in the modal with project.status
        - On submit, add the new project to the board and close the modal
        */
    setInitialStatus(status)
    setModalOpen(true)
  }

  return (
    <div className="w-80 shrink-0 p-4 gap-8 bg-gray-100 rounded-2xl">
      {/* Column Header */}
      <div className="flex flex-row justify-between items-center mb-4">
        {/* statusname + project count */}
        <div className="flex flex-row justify-items-center items-center gap-4">
          <h2 className="text-md font-bold text-text">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </h2>
          {projectCount > 0 && (
            <div className="text-md text-gray-500">{projectCount}</div>
          )}
        </div>
        {/* Add Button */}
        <button onClick={handleAddProject}>
          <CirclePlus className="w-6 h-6 text-accent cursor-pointer hover:opacity-70" />
        </button>
      </div>
      {/* Projects */}
      <div className="flex flex-col gap-4">
        {projects.length > 0 ? (
          projects.map((project) => {
            return (
              <ProjectCard
                onEdit={onEditProject}
                key={project.id}
                project={project}
                visibleCardFields={visibleCardFields}
                allStatuses={availableStatuses}
                onStatusChange={onProjectStatusChange}
              />
            )
          })
        ) : (
          <div className="text-center text-gray-500 mt-8">
            No projects in this status
          </div>
        )}
      </div>
    </div>
  )
}

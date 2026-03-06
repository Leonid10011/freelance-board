import { Project, ProjectStatus } from "@/domain/project"
import { VisibleCardFields } from "./board/types"
import { CirclePlus } from "lucide-react"
import { stat } from "fs"

export default function Column({
  projects,
  visibleCardFields,
  projectCount,
  status,
}: {
  projects: Project[]
  visibleCardFields: VisibleCardFields
  projectCount: number
  status: ProjectStatus
}) {
  const handleAddProject = () => {
    /*TODO: Open a modal to create a new project with status = project.status
        - Pre-fill the status field in the modal with project.status
        - On submit, add the new project to the board and close the modal

        */
  }

  return (
    <div className="w-80 shrink-0 p-4 gap-8 bg-gray-100 rounded-2xl">
      {/* Column Header */}
      <div className="flex flex-row justify-between">
        {/* statusname + project count */}
        <div className="flex flex-row justify-items-center items-center gap-4 mb-4">
          <h2 className="text-md font-bold text-gray-700">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </h2>
          {projectCount > 0 && (
            <div className="text-md text-gray-500">{projectCount}</div>
          )}
        </div>
        {/* Add Button */}
        <button onClick={handleAddProject}>
          <CirclePlus className="w-6 h-6 text-green-500 cursor-pointer" />
        </button>
      </div>
      {/* Projects */}
      <div className="flex flex-col gap-4">
        {projects.map((project) => {
          return (
            <div
              className="flex flex-col gap-2 py-4 px-8 bg-white rounded-2xl shadow p-4"
              key={project.id}
            >
              <h3 className="text-xl font-semibold">{project.title}</h3>
              {visibleCardFields.client && <div>Client: {project.client}</div>}
              {visibleCardFields.budget && <div>Budget: ${project.budget}</div>}
              {visibleCardFields.deadline && (
                <div>
                  Deadline:{" "}
                  {project.deadline
                    ? project.deadline.toLocaleDateString()
                    : "N/A"}
                </div>
              )}
              {visibleCardFields.priority && (
                <div>Priority: {project.priority}</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

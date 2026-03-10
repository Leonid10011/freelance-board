"use client"

import UpdateProjectModal from "@/components/projectModal/UpdateProjectModal"
import { Project } from "@/domain/project"
import { useMemo, useState } from "react"

export default function DebugModal({ p }: { p: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(p)
  const [projectToEditId, setProjectToEditId] = useState<string | null>(null)
  const [lastUpdatedProject, setLastUpdatedProject] = useState<Project | null>(
    null,
  )

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleModalOpen = () => {
    setIsModalOpen(false)
  }

  const projectToEdit = useMemo(
    () => projects.find((project) => project.id === projectToEditId) ?? null,
    [projects, projectToEditId],
  )

  const handleUpdate = (updatedProject: Project) => {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    )

    setLastUpdatedProject(updatedProject)
    setProjectToEditId(null)
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Debug UpdateProjectModal</h1>
      <p className="text-gray-600">
        Open one of the mock projects to test the update modal flow.
      </p>

      <div className="space-y-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-md border border-gray-200 p-3 flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{project.title}</p>
              <p className="text-sm text-gray-600">
                {project.client ?? "No client"} | {project.status} |{" "}
                {project.priority}
              </p>
            </div>
            <button
              className="px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
              onClick={() => {
                setProjectToEditId(project.id)
                setIsModalOpen(true)
              }}
            >
              Edit Project
            </button>
          </div>
        ))}
      </div>

      {lastUpdatedProject && (
        <div className="rounded-md border border-green-300 bg-green-50 p-3 text-sm">
          Last updated: {lastUpdatedProject.title} ({lastUpdatedProject.status},{" "}
          {lastUpdatedProject.priority})
        </div>
      )}

      {isModalOpen && projectToEdit && (
        <UpdateProjectModal
          project={projectToEdit}
          onUpdate={handleUpdate}
          onClose={handleModalOpen}
        />
      )}
    </main>
  )
}

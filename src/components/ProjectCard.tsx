"use client"

import { useEffect, useRef, useState } from "react"
import { Project } from "@/domain/project"
import { ProjectStatus } from "@/domain/project"
import { VisibleCardFields } from "./board/types"
import { format } from "date-fns"

type ProjectCardProps = {
  project: Project
  visibleCardFields: VisibleCardFields
  allStatuses: ProjectStatus[]
  onStatusChange: (projectId: string, newStatus: ProjectStatus) => void
  onEdit: (project: Project) => void
}

export default function ProjectCard({
  project,
  visibleCardFields,
  allStatuses,
  onStatusChange,
  onEdit,
}: ProjectCardProps) {
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const statusDropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleDocumentMouseDown = (event: MouseEvent) => {
      if (!isStatusDropdownOpen) {
        return
      }

      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleDocumentMouseDown)

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown)
    }
  }, [isStatusDropdownOpen])

  const handleStatusClick = () => {
    setIsStatusDropdownOpen((currentState) => !currentState)
  }

  const handleStatusSelect = (status: ProjectStatus) => {
    onStatusChange(project.id, status)
    setIsStatusDropdownOpen(false)
  }

  const formatStatus = (status: ProjectStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div
      className="flex flex-col bg-card rounded-2xl gap-6 py-4 px-6 hover:shadow-lg hover:bg-gray-100 hover:opacity-90 hover:cursor-pointer"
      onClick={() => onEdit(project)}
    >
      {/*Project Header*/}
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        {/* Status Badge */}

        <div ref={statusDropdownRef} className="relative">
          <button
            type="button"
            className="text-xs font-medium px-2 py-1 rounded-full border-2 hover:border-gray-400 hover:cursor-pointer hover:bg-green-500"
            onClick={handleStatusClick}
          >
            {formatStatus(project.status)}
          </button>

          {isStatusDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl border border-gray-200 bg-white shadow-lg z-10">
              {allStatuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl"
                  onClick={() => handleStatusSelect(status)}
                >
                  {formatStatus(status)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/*Project Details - only show fields that are enabled in visibleCardFields*/}
      <div className="flex flex-col gap-4 p-0">
        {visibleCardFields.client && (
          <div>Client: {project.client ?? "N/A"}</div>
        )}
        {visibleCardFields.budget && (
          <div>Budget: {project.budget ?? "N/A"}</div>
        )}
        {visibleCardFields.deadline && (
          <div>
            Deadline:{" "}
            {project.deadline ? format(project.deadline, "yyyy-MM-dd") : "N/A"}
          </div>
        )}
        {visibleCardFields.priority && (
          <div>Priority: {project.priority ?? "N/A"}</div>
        )}
      </div>
    </div>
  )
}

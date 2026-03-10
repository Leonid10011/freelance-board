"use client"

import { useEffect, useRef, useState } from "react"
import { Project } from "@/domain/project"
import { ProjectStatus } from "@/domain/project"
import { VisibleCardFields } from "./board/types"
import { format } from "date-fns"
import { CalendarClock, Euro, Flag, User } from "lucide-react"
import FieldItem from "./projectCard/FieldItem"

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

  const handleStatusClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsStatusDropdownOpen((currentState) => !currentState)
  }

  const handleStatusSelect = (
    event: React.MouseEvent<HTMLButtonElement>,
    status: ProjectStatus,
  ) => {
    event.stopPropagation()
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
        <h3 className="text-xl font-semibold text-text">{project.title}</h3>
        {/* Status Badge */}

        <div
          ref={statusDropdownRef}
          className="relative"
          onClick={(event) => event.stopPropagation()}
        >
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
                  onClick={(event) => handleStatusSelect(event, status)}
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
          <FieldItem
            icon={<User className="text-meta" />}
            text={project.client}
          />
        )}
        {visibleCardFields.budget && (
          <FieldItem
            icon={<Euro className="text-meta" />}
            text={
              project.budget && Number(project.budget) !== undefined
                ? `${Number(project.budget).toFixed(2)} €`
                : undefined
            }
          />
        )}
        {visibleCardFields.deadline && (
          <FieldItem
            icon={<CalendarClock className="text-meta" />}
            text={
              project.deadline ? format(project.deadline, "yyyy-MM-dd") : "N/A"
            }
          />
        )}
        {visibleCardFields.priority && (
          <FieldItem
            icon={<Flag className="text-meta" />}
            text={
              project.priority
                ? project.priority.slice(-1).toLocaleUpperCase() +
                  project.priority.slice(1)
                : "N/A"
            }
          />
        )}
      </div>
    </div>
  )
}

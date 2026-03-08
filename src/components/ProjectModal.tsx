"use client"

import {
  Project,
  PROJECT_PRIORITIES,
  PROJECT_STATUSES,
  ProjectPriority,
  ProjectStatus,
} from "@/domain/project"
import { User, X } from "lucide-react"
import { useEffect, useState } from "react"
import FieldLabel from "./projectModal/FieldLabel"
import { Input } from "./ui/input"
import DatePicker from "./projectModal/DatePicker"
import { SelectField } from "./projectModal/SelectField"
import { CreateProjectSchema } from "@/validation/project.schema"
import { format } from "date-fns"
import { createProject } from "@/repo/project.repo"

type ProjectModalProps = {
  onClose: (isOpen: boolean) => void
  initialStatus: ProjectStatus
  onSave: (newProject: Project) => void
}

export default function ProjectModal({
  onClose,
  initialStatus,
  onSave,
}: ProjectModalProps) {
  const [formState, setFormState] = useState({
    title: "",
    client: "",
    budget: "",
    deadline: "",
    status: initialStatus,
    priority: "medium" as ProjectPriority,
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleDateChange = (newDate: Date) => {
    setFormState((prev) => ({
      ...prev,
      deadline: format(newDate, "yyyy-MM-dd"), // Format as YYYY-MM-DD
    }))
  }

  const handleProjectStatusChange = (newStatus: ProjectStatus) => {
    setFormState((prev) => ({
      ...prev,
      status: newStatus,
    }))
  }

  const handleProjectPriorityChange = (newPriority: ProjectPriority) => {
    setFormState((prev) => ({
      ...prev,
      priority: newPriority,
    }))
  }

  const handleInputChange = (
    field: string,
    value: string | ProjectStatus | ProjectPriority,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    // Here you would typically send formState to your backend or state management
    if (isSubmitting) {
      console.warn("Already submitting, please wait...")
      return
    }

    try {
      setIsSubmitting(true)
      const validatedData = CreateProjectSchema.safeParse(formState)
      if (!validatedData.success) {
        console.error("Validation failed:", validatedData.error)
        return
      }
      const result = await createProject(validatedData.data)
      onSave(result)
      onClose(false)
    } catch (error) {
      console.error("Error creating project:", error)
      // Optionally, you could set an error state here to display an error message in the UI
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose(false)
      }
    }

    addEventListener("keydown", handleEscapeKey)

    return () => {
      removeEventListener("keydown", handleEscapeKey)
    }
  }, [onClose])

  return (
    <div aria-modal="true" role="dialog">
      <div
        className="fixed inset-0 backdrop-blur-sm flex items-center justify-center"
        onClick={() => onClose(false)}
      />
      <div className="bg-gray-100 rounded-2xl border-green-500 border-2 p-4 w-[28rem] max-w-lg w-full z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Header */}
        <div className="flex flex-row justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => onClose(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <input
          placeholder="New Project"
          className="w-full text-4xl font-bold placeholder-gray-300 border-none outline-none bg transparent focus:ring-0 py-2 mb-8"
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <FieldLabel icon={<User className="w-4 h-4" />} label="Client" />
            <Input
              placeholder="Empty"
              className="w-full"
              onChange={(e) => handleInputChange("client", e.target.value)}
              value={formState.client}
            />
          </div>
          <div className="flex flex-row gap-4">
            <FieldLabel icon={<User className="w-4 h-4" />} label="Budget" />
            <Input
              placeholder="Empty"
              className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => handleInputChange("budget", e.target.value)}
              value={formState.budget}
              type="number"
            />
          </div>
          <div className="flex flex-row gap-4">
            <FieldLabel icon={<User className="w-4 h-4" />} label="Deadline" />
            <DatePicker setDate={handleDateChange} />
          </div>
          <div className="flex flex-row gap-4">
            <FieldLabel icon={<User className="w-4 h-4" />} label="Status" />
            <SelectField
              label="Status"
              values={PROJECT_STATUSES}
              value={formState.status}
              setValue={handleProjectStatusChange}
            />
          </div>
          <div className="flex flex-row gap-4">
            <FieldLabel icon={<User className="w-4 h-4" />} label="Priority" />
            <SelectField
              label="Priority"
              values={PROJECT_PRIORITIES}
              value={formState.priority}
              setValue={handleProjectPriorityChange}
            />
          </div>
          {/* Footer - Save Button */}
          <div className="flex flex-row justify-end gap-8 mt-4">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 hover:cursor-pointer"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 hover:cursor-pointer"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

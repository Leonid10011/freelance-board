"use client"

import {
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

type ProjectModalProps = {
  onClose: (isOpen: boolean) => void
  initialStatus: ProjectStatus
}

export default function ProjectModal({
  onClose,
  initialStatus,
}: ProjectModalProps) {
  const [formState, setFormState] = useState({
    title: "",
    client: "",
    budget: "",
    deadline: "",
    status: initialStatus,
    priority: "medium",
  })

  const handleDateChange = (newDate: Date) => {
    setFormState({
      ...formState,
      deadline: format(newDate, "yyyy-MM-dd"), // Format as YYYY-MM-DD
    })
    console.log("formstate date:", formState.deadline)
  }

  const handleProjectStatusChange = (newStatus: ProjectStatus) => {
    setFormState({
      ...formState,
      status: newStatus,
    })
  }

  const handleProjectPriorityChange = (newPriority: ProjectPriority) => {
    setFormState({
      ...formState,
      priority: newPriority,
    })
  }

  const handleInputChange = (
    field: string,
    value: string | ProjectStatus | ProjectPriority,
  ) => {
    setFormState({
      ...formState,
      [field]: value,
    })
  }

  const handleSave = () => {
    // Here you would typically send formState to your backend or state management
    const validatedData = CreateProjectSchema.safeParse(formState)
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.message)
      return
    }
    console.log("Saving project with data:", formState)
    //onClose(false)
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
  }, [, onClose])

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
            />
          </div>
          <div className="flex flex-row gap-4">
            <FieldLabel icon={<User className="w-4 h-4" />} label="Budget" />
            <Input
              placeholder="Empty"
              className="w-full"
              onChange={(e) => handleInputChange("budget", e.target.value)}
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
              value={initialStatus}
              setValue={handleProjectStatusChange}
            />
          </div>
          <div className="flex flex-row gap-4">
            <FieldLabel icon={<User className="w-4 h-4" />} label="Priority" />
            <SelectField
              label="Priority"
              values={PROJECT_PRIORITIES}
              value={"medium"}
              setValue={handleProjectPriorityChange}
            />
          </div>
          {/* Footer - Save Button */}
          <div className="flex flex-row justify-end gap-8 mt-4">
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 hover:cursor-pointer">
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 hover:cursor-pointer"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

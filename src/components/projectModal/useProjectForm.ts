import { ProjectPriority, ProjectStatus } from "@/domain/project"
import { useState } from "react"
import { format } from "date-fns"
import { FormStateType, TextFieldKey } from "./types"

export function useProjectForm({
  initialState,
}: {
  initialState?: Partial<FormStateType>
}) {
  const [formState, setFormState] = useState({
    title: initialState?.title ?? "",
    client: initialState?.client ?? "",
    budget: initialState?.budget ?? "",
    deadline: initialState?.deadline ?? "",
    status: initialState?.status ?? "inquiry",
    priority: initialState?.priority ?? ("medium" as ProjectPriority),
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [saveError, setSaveError] = useState<string | null>(null)

  const setError = (error: string | null) => {
    console.error("Error in project form:", error)
    setSaveError(error)
  }

  const setSubmitting = (value: boolean) => {
    setIsSubmitting(value)
  }

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

  const handleInputChange = (field: TextFieldKey, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return {
    formState,
    isSubmitting,
    saveError,
    handleDateChange,
    handleProjectStatusChange,
    handleProjectPriorityChange,
    handleInputChange,
    setError,
    setSubmitting,
  }
}

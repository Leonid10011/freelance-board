import { Project, ProjectPriority, ProjectStatus } from "@/domain/project"
import { createProject } from "@/repo/project.repo"
import { CreateProjectSchema } from "@/validation/project.schema"
import { format } from "date-fns"
import { useState } from "react"
import ProjectFormFields from "./ProjectFormFields"
import ProjectModalShell from "./ProjectModalShell"
import { TextFieldKey } from "./types"

type CreateProjectModalProps = {
  initialStatus: ProjectStatus
  onClose: (isOpen: boolean) => void
  onSave: (newProject: Project) => void
}

export default function CreateProjectModal({
  initialStatus,
  onClose,
  onSave,
}: CreateProjectModalProps) {
  const [formState, setFormState] = useState({
    title: "",
    client: "",
    budget: "",
    deadline: "",
    status: initialStatus,
    priority: "medium" as ProjectPriority,
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [saveError, setSaveError] = useState<string | null>(null)

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

  const handleSave = async () => {
    if (isSubmitting) {
      return
    }

    try {
      setSaveError(null)
      // setSaveSuccess(null)  /* Temporarily disable success message to focus on error handling */
      setIsSubmitting(true)
      const validatedData = CreateProjectSchema.safeParse(formState)
      if (!validatedData.success) {
        console.error("Validation failed:", validatedData.error)
        return
      }
      const result = await createProject(validatedData.data)
      // setSaveSuccess("Project created successfully!") /* Temporarily disable success message to focus on error handling */
      onSave(result)
      onClose(false)
    } catch (error) {
      console.error("Error creating project:", error)
      setSaveError("Failed to create project. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formFieldComponent = (
    <ProjectFormFields
      formState={formState}
      onDeadlineChange={handleDateChange}
      onProjectStatusChange={handleProjectStatusChange}
      onProjectPriorityChange={handleProjectPriorityChange}
      onTextFieldChange={handleInputChange}
    />
  )

  const projectModalShellComponent = (
    <ProjectModalShell
      onClose={onClose}
      onPrimaryAction={handleSave}
      isSubmitting={isSubmitting}
      primaryActionLabel="Create Project"
      errorMessage={saveError}
    >
      {formFieldComponent}
    </ProjectModalShell>
  )

  return <>{projectModalShellComponent}</>
}

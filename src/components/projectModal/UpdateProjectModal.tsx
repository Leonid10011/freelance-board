import { Project } from "@/domain/project"
import { useProjectForm } from "./useProjectForm"
import { FormStateType } from "./types"
import { format } from "date-fns"
import ProjectModalShell from "./ProjectModalShell"
import ProjectFormFields from "./ProjectFormFields"
import { UpdateProjectSchema } from "@/validation/project.schema"
import { ProjectRepoError } from "@/repo/project.repo"
import { useAppMode } from "@/lib/app-mode"
import { createProjectGateway } from "@/repo/project.gateway"
import { useErrorContext } from "@/context/ErrorContext"

type UpdateProjectModalProps = {
  project: Project
  onUpdate: (updatedProject: Project) => void
  onClose: (isOpen: boolean) => void
}

export default function UpdateProjectModal({
  project,
  onUpdate,
  onClose,
}: UpdateProjectModalProps) {
  const mode = useAppMode()
  const porjectGateway = createProjectGateway(mode)

  const initialFormState: FormStateType = {
    title: project.title ?? "",
    client: project.client ?? "",
    budget: project.budget?.toString() ?? "",
    deadline: project.deadline ? format(project.deadline, "yyyy-MM-dd") : "",
    status: project.status,
    priority: project.priority,
  }

  const {
    formState,
    isSubmitting,
    handleDateChange,
    handleProjectStatusChange,
    handleProjectPriorityChange,
    handleInputChange,
    setSubmitting,
  } = useProjectForm({ initialState: initialFormState })

  const { error, handleError } = useErrorContext()

  const handleUpdate = async () => {
    if (isSubmitting) {
      return
    }

    try {
      handleError(null)
      setSubmitting(true)
      const validatedData = UpdateProjectSchema.safeParse(formState)
      if (!validatedData.success) {
        console.error("Validation failed:", validatedData.error)
        handleError("Invalid data. Please check your input and try again.")
        setSubmitting(false)
        return
      }
      const result = await porjectGateway.update(project.id, validatedData.data)
      // setSaveSuccess("Project updated successfully!") /* Temporarily disable success message to focus on error handling */
      onUpdate(result)
      onClose(false)
    } catch (error: unknown) {
      if (error instanceof ProjectRepoError) {
        if (error.code === "AUTH_REQUIRED") {
          handleError("You must be logged in to update a project.")
        } else if (error.code === "VALIDATION") {
          handleError("Invalid data. Please check your input and try again.")
        } else {
          handleError("Failed to update project. Please try again.")
        }
      } else {
        handleError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <ProjectModalShell
      isSubmitting={isSubmitting}
      onPrimaryAction={handleUpdate}
      primaryActionLabel="Update"
      onClose={() => onClose(false)}
      errorMessage={error}
    >
      <ProjectFormFields
        formState={formState}
        onDeadlineChange={handleDateChange}
        onProjectStatusChange={handleProjectStatusChange}
        onProjectPriorityChange={handleProjectPriorityChange}
        onTextFieldChange={handleInputChange}
      />
    </ProjectModalShell>
  )
}

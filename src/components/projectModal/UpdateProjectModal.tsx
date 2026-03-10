import { Project } from "@/domain/project"
import { useProjectForm } from "./useProjectForm"
import { FormStateType } from "./types"
import { format } from "date-fns"
import ProjectModalShell from "./ProjectModalShell"
import ProjectFormFields from "./ProjectFormFields"
import { UpdateProjectSchema } from "@/validation/project.schema"
import { ProjectRepoError, updateProject } from "@/repo/project.repo"
import { useAppMode } from "@/lib/app-mode"
import { createProjectGateway } from "@/repo/project.gateway"

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
    saveError,
    handleDateChange,
    handleProjectStatusChange,
    handleProjectPriorityChange,
    handleInputChange,
    setSubmitting,
    setError,
  } = useProjectForm({ initialState: initialFormState })

  const handleUpdate = async () => {
    if (isSubmitting) {
      return
    }

    try {
      setError(null)
      setSubmitting(true)
      const validatedData = UpdateProjectSchema.safeParse(formState)
      if (!validatedData.success) {
        console.error("Validation failed:", validatedData.error)
        setError("Invalid data. Please check your input and try again.")
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
          setError("You must be logged in to update a project.")
        } else if (error.code === "VALIDATION") {
          setError("Invalid data. Please check your input and try again.")
        } else {
          setError("Failed to update project. Please try again.")
        }
      } else {
        setError("An unexpected error occurred. Please try again.")
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
      errorMessage={saveError}
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

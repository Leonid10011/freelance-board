import { Project } from "@/domain/project"
import { useProjectForm } from "./useProjectForm"
import { FormStateType } from "./types"
import { format } from "date-fns"
import ProjectModalShell from "./ProjectModalShell"
import ProjectFormFields from "./ProjectFormFields"
import { UpdateProjectSchema } from "@/validation/project.schema"
import { updateProject } from "@/repo/project.repo"

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
        return
      }
      const result = await updateProject(project.id, validatedData.data)
      // setSaveSuccess("Project updated successfully!") /* Temporarily disable success message to focus on error handling */
      onUpdate(result)
    } catch (error) {
      console.error("Error updating project:", error)
      setError("Failed to update project. Please try again.")
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

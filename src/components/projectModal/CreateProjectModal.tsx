import { Project, ProjectStatus } from "@/domain/project"
import { createProject } from "@/repo/project.repo"
import { CreateProjectSchema } from "@/validation/project.schema"
import ProjectFormFields from "./ProjectFormFields"
import ProjectModalShell from "./ProjectModalShell"
import { useProjectForm } from "./useProjectForm"

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
  } = useProjectForm({
    initialState: {
      client: "",
      title: "",
      budget: "",
      deadline: "",
      status: initialStatus,
      priority: "medium",
    },
  })

  const handleSave = async () => {
    if (isSubmitting) {
      return
    }

    try {
      setError(null)
      // setSaveSuccess(null)  /* Temporarily disable success message to focus on error handling */
      setSubmitting(true)
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
      setError("Failed to create project. Please try again.")
    } finally {
      setSubmitting(false)
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

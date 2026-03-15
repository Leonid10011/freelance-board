import { Project, ProjectStatus } from "@/domain/project"
import { ProjectRepoError } from "@/repo/project.repo"
import { CreateProjectSchema } from "@/validation/project.schema"
import ProjectFormFields from "./ProjectFormFields"
import ProjectModalShell from "./ProjectModalShell"
import { useProjectForm } from "./useProjectForm"
import { useAppMode } from "@/lib/app-mode"
import { createProjectGateway } from "@/repo/project.gateway"
import { useErrorContext } from "@/context/ErrorContext"

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
  const mode = useAppMode()
  const porjectGateway = createProjectGateway(mode)

  const {
    formState,
    isSubmitting,
    handleDateChange,
    handleProjectStatusChange,
    handleProjectPriorityChange,
    handleInputChange,
    setSubmitting,
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

  const { error, handleError } = useErrorContext()

  const handleSave = async () => {
    if (isSubmitting) {
      return
    }

    try {
      handleError(null)
      // setSaveSuccess(null)  /* Temporarily disable success message to focus on error handling */
      setSubmitting(true)
      const validatedData = CreateProjectSchema.safeParse(formState)
      if (!validatedData.success) {
        console.error("Validation failed:", validatedData.error)
        return
      }
      const result = await porjectGateway.create(validatedData.data)
      // setSaveSuccess("Project created successfully!") /* Temporarily disable success message to focus on error handling */
      onSave(result)
      onClose(false)
    } catch (error: unknown) {
      if (error instanceof ProjectRepoError) {
        if (error.code === "AUTH_REQUIRED") {
          handleError("You must be logged in to create a project.")
        } else if (error.code === "VALIDATION") {
          handleError("Invalid data. Please check your input and try again.")
        } else {
          handleError("Failed to create project. Please try again.")
        }
      } else {
        handleError("An unexpected error occurred. Please try again.")
      }
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
      errorMessage={error}
    >
      {formFieldComponent}
    </ProjectModalShell>
  )

  return <>{projectModalShellComponent}</>
}

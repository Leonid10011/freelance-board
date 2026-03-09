import { Project } from "@/domain/project"
import { useProjectForm } from "./useProjectForm"
import { FormStateType } from "./types"
import { format } from "date-fns"

type UpdateProjectModalProps = {
  project: Project
}

export default function UpdateProjectModal({
  project,
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
}

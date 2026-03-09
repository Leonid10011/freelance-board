import { ProjectPriority, ProjectStatus } from "@/domain/project"

export type FormStateType = {
  title: string
  client: string
  budget: string
  deadline: string
  status: ProjectStatus
  priority: ProjectPriority
}

export type ProjectModalShellProps = {
  onClose: () => void
  onPrimaryAction: () => void
  isSubmitting: boolean
  primaryActionLabel: string
}

export type TextFieldKey = "title" | "client" | "budget"

import { ProjectStatus } from "@/domain/project"
import { createProjectGateway } from "@/repo/project.gateway"

type UseProjectActionsProps = {
  mode: "demo" | "live"
}

export function useProjectActions({ mode }: UseProjectActionsProps) {
  const demoGateway = createProjectGateway("demo")
  const liveGateway = createProjectGateway("live")

  const handleStatusChange = async (
    projectId: string,
    status: ProjectStatus,
  ) => {
    try {
      if (mode === "demo") {
        return await demoGateway.update(projectId, { status })
      } else {
        return await liveGateway.update(projectId, { status })
      }
    } catch (error: unknown) {
      console.error("Failed to update project status:", error)
      // todo after implementing global error handling: show user-friendly error message
    }
  }

  return { handleStatusChange }
}

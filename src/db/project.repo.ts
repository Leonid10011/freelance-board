import { UpdateProjectInput } from "@/repo/project.repo"


export function toProjectUpdatePatch(input: UpdateProjectInput) {
  const patch: Record<string, any> = {}

  if (input.title !== undefined) patch.title = input.title
  if (input.client !== undefined) patch.client = input.client ?? null
  if (input.budget !== undefined) patch.budget = input.budget ?? null
  if (input.deadline !== undefined)
    patch.deadline = input.deadline ? input.deadline.toISOString().slice(0, 10) : null
  if (input.status !== undefined) patch.status = input.status
  if (input.priority !== undefined) patch.priority = input.priority

  return patch
}
import { createProject, deleteProject, updateProject } from "./project.repo"
/* Infere the type from live repo function */
export type CreateInput = Parameters<typeof createProject>[0]
export type UpdateId = Parameters<typeof updateProject>[0]
export type UpdateData = Parameters<typeof updateProject>[1]
export type DeleteId = Parameters<typeof deleteProject>[0]

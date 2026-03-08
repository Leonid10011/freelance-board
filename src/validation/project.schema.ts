import { z } from "zod"

const ProjectStatusSchema = z.enum([
  "inquiry",
  "proposal",
  "negotiation",
  "active",
  "waiting",
  "completed",
])

const ProjectPrioritySchema = z.enum(["low", "medium", "high"])

// Helpers for Form-Inputs (strings) -> Domain
const MoneySchema = z
  .union([z.number(), z.string()])
  .transform((v) => (typeof v === "string" ? v.trim() : v))
  .transform((v) => (typeof v === "string" ? Number(v) : v))
  .refine((v) => Number.isFinite(v), { message: "Budget must be a number" })
  .refine((v) => v >= 0, { message: "Budget must be ≥ 0" })

const DateSchema = z.preprocess(
  (raw) => {
    if (typeof raw === "string") {
      const trimmed = raw.trim()
      return trimmed === "" ? undefined : trimmed
    }
    return raw
  },
  z
    .union([z.date(), z.string(), z.undefined()])
    .transform((v) => (typeof v === "string" ? new Date(v) : v))
    .refine(
      (d) =>
        d === undefined || (d instanceof Date && !Number.isNaN(d.getTime())),
      { message: "Invalid date" },
    ),
)

export const BaseProjectSchema = z.object({
  title: z.string().min(1).max(120),
  client: z.string().trim().min(1).max(120).optional(),
  budget: MoneySchema.optional(),
  deadline: DateSchema.optional(),
  status: ProjectStatusSchema,
  priority: ProjectPrioritySchema,
})

export const CreateProjectSchema = BaseProjectSchema.extend({
  status: ProjectStatusSchema.default("inquiry"),
  priority: ProjectPrioritySchema.default("medium"),
})

export const UpdateProjectSchema = BaseProjectSchema.partial().refine(
  (obj) => Object.keys(obj).length > 0,
  { message: "No fields to update" },
)

export type CreateProjectValidated = z.infer<typeof CreateProjectSchema>
export type UpdateProjectValidated = z.infer<typeof UpdateProjectSchema>

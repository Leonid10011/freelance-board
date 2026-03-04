import { describe, it, expect } from "vitest"
import { CreateProjectSchema, UpdateProjectSchema } from "./project.schema"

describe("Project schemas", () => {
  it("Create: applies defaults", () => {
    const r = CreateProjectSchema.safeParse({ title: "Test" })
    expect(r.success).toBe(true)
    if (!r.success) return

    expect(r.data.status).toBe("inquiry")
    expect(r.data.priority).toBe("medium")
  })

  it("Create: transforms budget string to number", () => {
    const r = CreateProjectSchema.safeParse({
      title: "Test",
      budget: "1000",
    })
    expect(r.success).toBe(true)
    if (!r.success) return

    expect(typeof r.data.budget).toBe("number")
    expect(r.data.budget).toBe(1000)
  })

  it("Update: rejects empty object", () => {
    const r = UpdateProjectSchema.safeParse({})
    expect(r.success).toBe(false)
  })

  it("Update: allows partial patch", () => {
    const r = UpdateProjectSchema.safeParse({ title: "New" })
    expect(r.success).toBe(true)
  })
})
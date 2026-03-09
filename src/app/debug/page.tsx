"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/repo/project.repo"
import {
  CreateProjectSchema,
  CreateProjectValidated,
  UpdateProjectSchema,
} from "@/validation/project.schema"

const mockProject: CreateProjectValidated = {
  title: "Transformar loja física em e-commerce",
  client: "Artigos para Casa Ltda",
  budget: 1000,
  deadline: new Date("2024-11-30"),
  status: "proposal",
  priority: "medium",
}

export default function DebugPage() {
  const handleClick = () => {
    console.log("Button clicked! This is a debug message.")
    const result = createProject(mockProject)
    console.log("Create project result:", result)
  }

  const handleGetProjects = () => {
    console.log("Fetching projects...")
    // Here you would call the getProjects function and log the results
    const result = getProjects()
    console.log("Get projects result:", result)
  }

  const handleUpdateProject = (id: string, title: string) => {
    console.log(`Updating project ${id} with new title: ${title}`)
    const result = updateProject(id, { title: title })
    console.log("Update project result:", result)
  }

  const handleDeleteProject = (id: string) => {
    console.log(`Deleting project with id: ${id}`)
    const result = deleteProject(id)

    console.log("Delete project result:", result)
  }

  const handleSchemaTest = () => {
    // Here you can test your Zod schema with different inputs and log the results
    const testInput = {
      title: "",
      budget: "abc",
      status: "active",
      priority: "high",
    }
    const result = CreateProjectSchema.safeParse(testInput)
    console.log("empty", UpdateProjectSchema.safeParse({}))
    console.log(UpdateProjectSchema.safeParse({ title: "New Title" }))
    console.log(UpdateProjectSchema.safeParse({ budget: "abc" }))
    console.log("Schema validation result:", result)
  }

  return (
    <div
      className="flex h-screen w-screen items-center justify-center"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1 className="text-2xl font-bold">Debug Page</h1>
      <Button style={{ padding: "20px", margin: "30px" }} onClick={handleClick}>
        Teste create
      </Button>
      <Button
        style={{ padding: "20px", margin: "30px" }}
        onClick={handleGetProjects}
      >
        Teste getProjects
      </Button>
      <div className="flex">
        <Label style={{ marginRight: "10px" }}>
          This is a label for debugging:
        </Label>
        <Button
          style={{ padding: "10px" }}
          onClick={() =>
            handleUpdateProject(
              "1a4b03d0-de53-41fe-85f0-ba895354e4a5",

              "Updated Title",
            )
          }
        >
          Update Title
        </Button>
      </div>
      <Button
        onClick={() =>
          handleDeleteProject("6ec7e036-0d80-4d8d-a18d-d068847416c8")
        }
        style={{ padding: "20px", margin: "30px" }}
      >
        Delete Project
      </Button>
      <Button
        onClick={handleSchemaTest}
        style={{ padding: "20px", margin: "30px" }}
      >
        Test Schema Validation
      </Button>
    </div>
  )
}

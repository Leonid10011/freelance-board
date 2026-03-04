"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Project } from "@/domain/project"
import { createProject, deleteProject, getProjects, updateProject } from "@/repo/project.repo"

const mockProject: Project = {
  id: "3",
  title: "eCommerce Website Design",
  client: "DesignCo",
  budget: 1000,
  deadline: new Date("2024-11-30"),
  status: "proposal",
  priority: "medium",
  createdAt: new Date(),
  updatedAt: new Date(),
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
    console.log(`Updating project ${id} with new title: ${title}`);
    const result = updateProject(id, { title: title });
    console.log("Update project result:", result);
  }

  const handleDeleteProject = (id: string) => {
    console.log(`Deleting project with id: ${id}`);
    const result = deleteProject(id);
    console.log("Delete project result:", result);  
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center" style={{display: "flex", flexDirection: "column"}}>
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
        <Label style={{ marginRight: "10px" }}>This is a label for debugging:</Label>
        <Button style={{ padding: "10px" }} onClick={() => handleUpdateProject("6ec7e036-0d80-4d8d-a18d-d068847416c8"

, "Updated Title")}>
          Update Title
        </Button>
      </div>
      <Button onClick={() => handleDeleteProject("6ec7e036-0d80-4d8d-a18d-d068847416c8")} style={{ padding: "20px", margin: "30px" }}>
        Delete Project
      </Button>
    </div>
  );
}

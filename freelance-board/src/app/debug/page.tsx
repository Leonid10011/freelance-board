"use client"

import { Button } from "@/components/ui/button"
import { Project } from "@/domain/project"
import { createProject } from "@/repo/project.repo"

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

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Debug Page</h1>
      <Button style={{ padding: "20px" }} onClick={handleClick}>
        Teste create
      </Button>
    </div>
  )
}

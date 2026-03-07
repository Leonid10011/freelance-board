"use client"

import { ProjectStatus } from "@/domain/project"
import { X } from "lucide-react"

type ProjectModalProps = {
  onClose: (isOpen: boolean) => void
  initialStatus: ProjectStatus
}

export default function ProjectModal({
  onClose,
  initialStatus,
}: ProjectModalProps) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gray-100 rounded-2xl border-green-500 border-2 p-4 w-[28rem] max-w-lg w-full ">
        {/* Header */}
        <button
          className="top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => onClose(false)}
        >
          <X className="w-6 h-6" />
        </button>
        <div>Initial Status: {initialStatus}</div>
      </div>
    </div>
  )
}

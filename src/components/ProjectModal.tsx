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
    <>
      <div
        className="fixed inset-0 backdrop-blur-sm flex items-center justify-center"
        onClick={() => onClose(false)}
      />
      <div className="bg-gray-100 rounded-2xl border-green-500 border-2 p-4 w-[28rem] max-w-lg w-full z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Header */}
        <button
          className="top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => onClose(false)}
        >
          <X className="w-6 h-6" />
        </button>
        <div>Initial Status: {initialStatus}</div>
      </div>
    </>
  )
}

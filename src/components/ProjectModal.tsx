"use client"

import { ProjectStatus } from "@/domain/project"
import { User, X } from "lucide-react"
import { useEffect } from "react"
import { VisibleCardFields } from "./board/types"
import InputField from "./projectModal/InputField"

type ProjectModalProps = {
  onClose: (isOpen: boolean) => void
  initialStatus: ProjectStatus
  labels: VisibleCardFields
}

export default function ProjectModal({
  onClose,
  initialStatus,
  labels,
}: ProjectModalProps) {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose(false)
      }
    }

    addEventListener("keydown", handleEscapeKey)

    return () => {
      removeEventListener("keydown", handleEscapeKey)
    }
  }, [, onClose])

  return (
    <div aria-modal="true" role="dialog">
      <div
        className="fixed inset-0 backdrop-blur-sm flex items-center justify-center"
        onClick={() => onClose(false)}
      />
      <div className="bg-gray-100 rounded-2xl border-green-500 border-2 p-4 w-[28rem] max-w-lg w-full z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Header */}
        <div className="flex flex-row justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => onClose(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <input
          placeholder="New Project"
          className="w-full text-4xl font-bold placeholder-gray-300 border-none outline-none bg transparent focus:ring-0 py-2"
        />
        <InputField
          icon={<User className="w-6 h-6" />}
          label="Client Name"
          type="input"
          onChange={() => {}}
        />
      </div>
    </div>
  )
}

import { X } from "lucide-react"
import { useEffect } from "react"

type ProjectModalShellProps = {
  onClose: (isOpen: boolean) => void
  onPrimaryAction: () => void
  onDelete?: () => void
  isSubmitting: boolean
  primaryActionLabel: string
  children?: React.ReactNode
  errorMessage?: string | null
}

export default function ProjectModalShell({
  onClose,
  onPrimaryAction,
  onDelete,
  isSubmitting,
  primaryActionLabel,
  children,
  errorMessage,
}: ProjectModalShellProps) {
  useEffect(() => {
    /* Close the modal when the user presses the Escape key */
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose(false)
      }
    }

    addEventListener("keydown", handleEscapeKey)

    return () => {
      removeEventListener("keydown", handleEscapeKey)
    }
  }, [onClose])

  return (
    <div aria-modal="true" role="dialog">
      <div
        className="fixed inset-0 backdrop-blur-sm flex items-center justify-center"
        onClick={() => onClose(false)}
      />
      <div className="bg-gray-100 rounded-2xl border-1 border-meta/20 p-6 w-[32rem] max-w-lg w-full z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Header */}
        <div className="flex flex-row justify-end">
          <button
            className="text-gray-500 hover:bg-muted/20 rounded-md p-1 transition hover:cursor-pointer"
            onClick={() => onClose(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Body */}
        <div className="flex flex-col gap-4">{children}</div>
        {/* Footer */}
        <div className="flex flex-row justify-end gap-8 mt-8">
          {onDelete && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 hover:cursor-pointer"
              onClick={onDelete}
              disabled={isSubmitting}
            >
              Delete
            </button>
          )}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 hover:cursor-pointer"
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 hover:cursor-pointer"
            onClick={onPrimaryAction}
            disabled={isSubmitting}
          >
            {primaryActionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

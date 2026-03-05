import { ProjectStatus } from "@/domain/project"
import { useBoardPreferences } from "../board/useBoardPreferences"

type FilterItemProps = {
  label: string
  isActive: boolean
  toggleStatus: (status: ProjectStatus) => void
}

export default function FilterItem({
  label,
  isActive,
  toggleStatus,
}: FilterItemProps) {
  const handleClick = () => {
    console.log("Toggling status:", label)
    toggleStatus(label as ProjectStatus)
  }

  return (
    <div
      className={`cursor-pointer ${isActive ? "border-green-500 border-b-2 pb-1" : "text-gray-500"}`}
      onClick={handleClick}
    >
      {label}
    </div>
  )
}

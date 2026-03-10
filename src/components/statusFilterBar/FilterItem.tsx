import { ProjectStatus } from "@/domain/project"

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
    toggleStatus(label as ProjectStatus)
  }

  return (
    <div
      className={`cursor-pointer ${isActive ? "border-accent border-b-2 pb-1" : "text-gray-500"}`}
      onClick={handleClick}
    >
      {label}
    </div>
  )
}

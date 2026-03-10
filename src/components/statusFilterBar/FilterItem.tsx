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
      className={`cursor-pointer ${isActive ? "border-accent border-b-2 pb-1 hover:opacity-80" : "text-gray-500 hover:opacity-80"}`}
      onClick={handleClick}
    >
      {label}
    </div>
  )
}

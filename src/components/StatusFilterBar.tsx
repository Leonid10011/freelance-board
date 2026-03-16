import { ProjectStatus } from "@/domain/project"
import FilterItem from "./statusFilterBar/FilterItem"

export default function StatusFilterBar({
  statuses,
  visibleStatuses,
  toggleStatus,
}: {
  statuses: ProjectStatus[]
  visibleStatuses: ProjectStatus[]
  toggleStatus: (status: ProjectStatus) => void
}) {
  return (
    <div className="flex gap-8 py-6 px-8 max-md:grid max-md:grid-cols-1 max-md:gap-4 max-md:px-4">
      {statuses.map((status) => (
        <FilterItem
          key={status}
          label={status}
          isActive={visibleStatuses.includes(status)}
          toggleStatus={toggleStatus}
        />
      ))}
    </div>
  )
}

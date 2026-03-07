import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProjectPriority, ProjectStatus } from "@/domain/project"

export function SelectField<T extends string>({
  label,
  values,
  value,
  setValue,
}: {
  label: string
  values: readonly T[]
  value?: T
  setValue: (value: T) => void
}) {
  return (
    <Select onValueChange={setValue} value={value}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder={`Select a ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {values.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

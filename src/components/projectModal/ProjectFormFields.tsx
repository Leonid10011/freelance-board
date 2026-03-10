import { CalendarClock, Euro, Flag, Info, User } from "lucide-react"
import FieldLabel from "./FieldLabel"
import { Input } from "../ui/input"
import DatePicker from "./DatePicker"
import { SelectField } from "./SelectField"
import {
  PROJECT_PRIORITIES,
  PROJECT_STATUSES,
  ProjectPriority,
  ProjectStatus,
} from "@/domain/project"
import { FormStateType, TextFieldKey } from "./types"
import { parse } from "date-fns"

type ProjectFormFieldsProps = {
  formState: FormStateType
  onDeadlineChange: (newDate: Date) => void
  onProjectStatusChange: (newStatus: ProjectStatus) => void
  onProjectPriorityChange: (newPriority: ProjectPriority) => void
  onTextFieldChange: (field: TextFieldKey, value: string) => void
}
export default function ProjectFormFields({
  formState,
  onDeadlineChange,
  onProjectStatusChange,
  onProjectPriorityChange,
  onTextFieldChange,
}: ProjectFormFieldsProps) {
  const datePickerDate = formState.deadline
    ? parse(formState.deadline, "yyyy-MM-dd", new Date())
    : undefined

  return (
    <>
      <input
        placeholder="New Project"
        className="w-full text-4xl font-bold placeholder-gray-300 border-none outline-none bg transparent focus:ring-0 py-2 mb-8"
        onChange={(e) => onTextFieldChange("title", e.target.value)}
        value={formState.title}
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <FieldLabel icon={<User className="w-4 h-4" />} label="Client" />
          <Input
            placeholder="Empty"
            className="w-full"
            onChange={(e) => onTextFieldChange("client", e.target.value)}
            value={formState.client}
          />
        </div>
        <div className="flex flex-row gap-4">
          <FieldLabel icon={<Euro className="w-4 h-4" />} label="Budget" />
          <Input
            placeholder="Empty"
            className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            onChange={(e) => onTextFieldChange("budget", e.target.value)}
            value={formState.budget}
            type="number"
          />
        </div>
        <div className="flex flex-row gap-4">
          <FieldLabel
            icon={<CalendarClock className="w-4 h-4" />}
            label="Deadline"
          />
          <DatePicker date={datePickerDate} setDate={onDeadlineChange} />
        </div>
        <div className="flex flex-row gap-4">
          <FieldLabel icon={<Info className="w-4 h-4" />} label="Status" />
          <SelectField
            label="Status"
            values={PROJECT_STATUSES}
            value={formState.status}
            setValue={onProjectStatusChange}
          />
        </div>
        <div className="flex flex-row gap-4">
          <FieldLabel icon={<Flag className="w-4 h-4" />} label="Priority" />
          <SelectField
            label="Priority"
            values={PROJECT_PRIORITIES}
            value={formState.priority}
            setValue={onProjectPriorityChange}
          />
        </div>
      </div>
    </>
  )
}

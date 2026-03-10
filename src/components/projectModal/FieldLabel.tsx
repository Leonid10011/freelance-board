import { Label } from "../ui/label"

type FieldLabelProps = {
  icon: React.ReactNode
  label: string
}

export default function FieldLabel({ icon, label }: FieldLabelProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <div className="flex flex-row items-center gap-4 rounded-md border-none p-2 hover:cursor-pointer hover:bg-gray-300">
        <span className="flex items-center">{icon}</span>
        <Label className="w-32 rounded-md text-md font-medium text-gray-700 hover:cursor-pointer hover:bg-gray-300">
          {label}
        </Label>
      </div>
    </div>
  )
}

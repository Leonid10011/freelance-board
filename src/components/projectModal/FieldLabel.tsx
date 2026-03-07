import { Label } from "../ui/label"

type FieldLabelProps = {
  icon: React.ReactNode
  label: string
}

export default function FieldLabel({ icon, label }: FieldLabelProps) {
  return (
    <>
      <div className="flex flex-row justify-between gap-4 items-end">
        <div className="flex flex-row gap-1 hover:cursor-pointer hover:bg-gray-300 border-none rounded-md p-2">
          {icon}
          <Label className="text-md font-medium text-gray-700 w-32 hover:cursor-pointer hover:bg-gray-300 rounded-md">
            {label}
          </Label>
        </div>
      </div>
    </>
  )
}

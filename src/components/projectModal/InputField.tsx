import { Label } from "../ui/label"

type InputTextTyp = "input" | "textarea"

type InputFieldProps = {
  icon: React.ReactNode
  label: string
  type: InputTextTyp
  onChange: (newValue: string) => void
}

export default function InputField({
  icon,
  label,
  type,
  onChange,
}: InputFieldProps) {
  return (
    <>
      <div className="flex flex-row justify-between gap-4 items-end">
        <div className="flex flex-row gap-1 hover:cursor-pointer hover:bg-gray-300 border-none rounded-md p-2">
          {icon}
          <Label className="text-md font-medium text-gray-700 w-32 hover:cursor-pointer hover:bg-gray-300 rounded-md">
            {label}
          </Label>
        </div>
        {type === "input" ? (
          <input
            className="w-full text-md border-none rounded-md focus:ring focus:ring-opacity-50 hover:bg-gray-300 hover:cursor-pointer p-2"
            onChange={(e) => onChange(e.target.value)}
            placeholder="Empty"
          />
        ) : (
          <textarea
            className="w-full text-md border-none rounded-md focus:ring focus:ring-opacity-50 hover:bg-gray-300 hover:cursor-pointer p-2"
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
    </>
  )
}

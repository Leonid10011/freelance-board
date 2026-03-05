import { ProjectCardField } from "./board/types"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { EyeClosedIcon, EyeIcon } from "lucide-react"

type BoardProps = {
  visibleCardFields: Record<ProjectCardField, boolean>
  toggleCardField: (field: ProjectCardField) => void
}

export default function ViewSidebar({
  visibleCardFields,
  toggleCardField,
}: BoardProps) {
  const handleReset = () => {
    Object.keys(visibleCardFields).forEach((field) => {
      const cardField = field as ProjectCardField
      if (!visibleCardFields[cardField]) {
        toggleCardField(cardField)
      }
    })
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold mb-4">View Card Fields</h2>
      <div className="flex space-between mb-8">
        <Label>
          Visible:{" "}
          {
            Object.values(visibleCardFields).filter((value) => value === true)
              .length
          }
        </Label>
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <div className="flex flex-col gap-4">
        {Object.entries(visibleCardFields).map(([field, isVisible]) => (
          <div
            key={field}
            className={`cursor-pointer flex items-center gap-2 ${
              isVisible ? "" : "text-gray-500"
            }`}
            onClick={() => toggleCardField(field as ProjectCardField)}
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
            {isVisible ? (
              <EyeIcon className="w-4 h-4" />
            ) : (
              <EyeClosedIcon className="w-4 h-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

import { ProjectCardField } from "./board/types"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { EyeClosedIcon, EyeIcon, PanelRightClose } from "lucide-react"

type ViewSidebarProps = {
  visibleCardFields: Record<ProjectCardField, boolean>
  toggleCardField: (field: ProjectCardField) => void
}

export default function ViewSidebar({
  visibleCardFields,
  toggleCardField,
}: ViewSidebarProps) {
  const handleReset = () => {
    Object.keys(visibleCardFields).forEach((field) => {
      const cardField = field as ProjectCardField
      if (!visibleCardFields[cardField]) {
        toggleCardField(cardField)
      }
    })
  }

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex flex-row items-center justify-between mb-8">
        <h2 className="text-md font-semibold">Card Fields</h2>
        <PanelRightClose className="w-6 h-6 text-muted hover:opacity-70 hover:cursor-pointer" />
      </div>
      <div className="flex text-sm justify-between mb-8">
        <Label className="text-sm text-muted">
          Visible:{" "}
          {
            Object.values(visibleCardFields).filter((value) => value === true)
              .length
          }
        </Label>
        <Button
          onClick={handleReset}
          className="p-0 pr-2 bg-transparent text-muted hover:bg-transparent hover:text-accent focus:bg-transparent focus:text-accent border-none hover:cursor-pointer"
        >
          Reset
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        {Object.entries(visibleCardFields).map(([field, isVisible]) => (
          <div
            key={field}
            className={`cursor-pointer flex text-text font-regular items-center gap-2 ${
              isVisible ? "" : "text-muted"
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

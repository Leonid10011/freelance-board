import { ProjectCardField } from "./board/types"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { EyeClosedIcon, EyeIcon, PanelRightClose } from "lucide-react"

type ViewSidebarProps = {
  visibleCardFields: Record<ProjectCardField, boolean>
  toggleCardField: (field: ProjectCardField) => void
  toggleSidebar: () => void
}

export default function ViewSidebar({
  visibleCardFields,
  toggleCardField,
  toggleSidebar,
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
        <button
          className="p-1 rounded-md text-muted transition hover:bg-muted/20 hover:cursor-pointer"
          onClick={toggleSidebar}
        >
          <PanelRightClose className="w-6 h-6 " />
        </button>
      </div>
      <div className="flex text-sm justify-between mb-8 p-1">
        <Label className="text-sm text-muted">
          Visible:{" "}
          {
            Object.values(visibleCardFields).filter((value) => value === true)
              .length
          }
        </Label>
        <Button
          onClick={handleReset}
          className="p-1 bg-transparent text-muted hover:bg-muted/20 focus:bg-transparent focus:text-accent border-none hover:cursor-pointer"
        >
          Reset
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        {Object.entries(visibleCardFields).map(([field, isVisible]) => (
          <div
            key={field}
            className={`cursor-pointer flex text-text font-regular items-center gap-2 hover:bg-muted/20 rounded p-1 ${
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

export default function FieldItem({
  icon,
  text,
}: {
  icon: React.ReactNode
  text?: string
}) {
  return (
    <div className="flex items-center gap-4 text-text hover:bg-muted/20 p-1 rounded-md">
      {icon}
      {text ? text : "N/A"}
    </div>
  )
}

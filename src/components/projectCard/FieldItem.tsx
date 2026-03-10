export default function FieldItem({
  icon,
  text,
}: {
  icon: React.ReactNode
  text?: string
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      {text ? text : "N/A"}
    </div>
  )
}

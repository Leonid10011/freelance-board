import FilterItem from "./statusFilterBar/FilterItem";

export default function StatusFilterBar() {
  return (
    <div className="flex gap-32 py-32 px-24">
      <FilterItem label="All" isActive={true} onClick={() => console.log("All clicked")} />
      <FilterItem label="Active" isActive={false} onClick={() => console.log("Active clicked")} />
      <FilterItem label="Completed" isActive={false} onClick={() => console.log("Completed clicked")} />
    </div>
  )
}
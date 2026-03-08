import { format } from "date-fns"

import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

import { Calendar } from "../ui/calendar"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"

export default function DatePicker({
  setDate,
}: {
  setDate: (date: Date) => void
}) {
  const [date, setDateState] = useState<Date>(new Date())

  const handleDateChange = (newDate: Date) => {
    setDateState(newDate)
    setDate(newDate)
    console.log("Selected date:", newDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          data-empty={!date}
          className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {date ? format(new Date(date), "PPP") : <span>Pick a date</span>}
          <ChevronDownIcon data-icon="inline-end" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          defaultMonth={date}
          required
        />
      </PopoverContent>
    </Popover>
  )
}

import React from 'react'
import { format } from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useCalendarStore } from "@/store/calendarStore";

export const DateNavigator: React.FC = () => {
  const goToToday = useCalendarStore((state) => state.goToToday)
  const previousMonth = useCalendarStore((state) => state.previousMonth)
  const nextMonth = useCalendarStore((state) => state.nextMonth)

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={previousMonth}
        className="p-2 hover:bg-cal-border rounded transition"
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        onClick={goToToday}
        className="px-4 py-2 hover:bg-cal-border rounded transition"
      >
        Today
      </button>
      <button
        onClick={nextMonth}
        className="p-2 hover:bg-cal-border rounded transition"
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  )
}
import React from 'react'
import { useCalendarStore } from '@/store/calendarStore'
import { getDaysInMonth, startOfMonth } from 'date-fns'

export const MiniCalendar: React.FC = () => {
  const currentDate = useCalendarStore((state) => state.currentDate)
  const setCurrentDate = useCalendarStore((state) => state.setCurrentDate)

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = startOfMonth(currentDate)
  const startingDayOfWeek = firstDay.getDay()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i)

  return (
    <div>
      <h3 className="font-semibold mb-3">{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day} className="text-center text-xs font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 auto-rows-[28px]">
        {emptyDays.map((i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
            className="text-xs rounded hover:bg-cal-border transition"
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}
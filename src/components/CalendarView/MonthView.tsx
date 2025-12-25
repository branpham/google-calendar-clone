import React from 'react'
import { useCalendarStore } from '@/store/calendarStore'
import { getDaysInMonth, startOfMonth, format } from 'date-fns'

export const MonthView: React.FC = () => {
  const currentDate = useCalendarStore((state) => state.currentDate)
  const events = useCalendarStore((state) => state.events)
  const selectEvent = useCalendarStore((state) => state.selectEvent)
  const setEventEditorOpen = useCalendarStore((state) => state.setEventEditorOpen)

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = startOfMonth(currentDate)
  const startingDayOfWeek = firstDay.getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i)

  const getEventsForDay = (day: number) => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return events.filter((event) => {
      const eventStart = new Date(event.startDate)
      return eventStart.getDate() === day && 
             eventStart.getMonth() === targetDate.getMonth() &&
             eventStart.getFullYear() === targetDate.getFullYear()
    })
  }

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 auto-rows-[120px]">
        {emptyDays.map((i) => (
          <div key={`empty-${i}`} className="bg-cal-border rounded" />
        ))}
        {days.map((day) => {
          const dayEvents = getEventsForDay(day)
          return (
            <div key={day} className="bg-cal-border rounded p-2 overflow-y-auto cursor-pointer hover:bg-gray-600 transition">
              <div className="font-semibold mb-1">{day}</div>
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    onClick={() => {
                      selectEvent(event)
                      setEventEditorOpen(true)
                    }}
                    className="text-xs p-1 rounded bg-blue-600 truncate hover:bg-blue-700"
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-400">+{dayEvents.length - 2} more</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
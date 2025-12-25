import React from 'react'
import { getDaysInMonth, isToday, isDateInMonth } from '../../utils/dateUtils'
import { useCalendarStore } from '../../store/calendarStore'
import { Event } from '../../types/calendar'
import { format, isSameDay } from 'date-fns'

export const MonthView: React.FC = () => {
  const currentDate = useCalendarStore((state) => state.currentDate)
  const events = useCalendarStore((state) => state.events)
  const calendars = useCalendarStore((state) => state.calendars)
  const setCurrentDate = useCalendarStore((state) => state.setCurrentDate)

  const days = getDaysInMonth(currentDate)
  const weekDaysShort = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const getEventsForDate = (date: Date): Event[] => {
    return events
      .filter((event) => {
        const eventStart = new Date(event.startTime)
        return isSameDay(eventStart, date) && calendars.find(c => c.id === event.calendarId)?.visible
      })
      .slice(0, 3)
  }

  return (
    <div className="flex flex-col h-full bg-cal-bg overflow-auto">
      <div className="grid grid-cols-7 gap-px bg-cal-border flex-shrink-0">
        {weekDaysShort.map((day) => (
          <div key={day} className="bg-cal-bg p-4 text-center font-semibold text-sm">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px flex-1 bg-cal-border p-px">
        {days.map((day) => {
          const isCurrentMonth = isDateInMonth(day, currentDate)
          const isTodayDate = isToday(day)
          const dayEvents = getEventsForDate(day)

          return (
            <div
              key={format(day, 'yyyy-MM-dd')}
              onClick={() => setCurrentDate(day)}
              className={`
                bg-cal-bg min-h-24 p-2 cursor-pointer transition
                ${!isCurrentMonth && 'bg-opacity-50'}
                ${isTodayDate && 'border-2 border-blue-500'}
                hover:bg-gray-800
              `}
            >
              <div className={`text-sm font-semibold mb-1 ${!isCurrentMonth && 'text-gray-600'}`}>
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-blue-600 text-white text-xs px-2 py-1 rounded truncate"
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
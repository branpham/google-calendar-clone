import React from 'react'
import { getDaysInMonth, isToday, isDateInMonth, formatMonthYear } from '../../utils/dateUtils'
import { useCalendarStore } from '../../store/calendarStore'
import { format, addMonths, subMonths } from 'date-fns'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export const MiniCalendar: React.FC = () => {
  const [miniDate, setMiniDate] = React.useState(new Date())
  const currentDate = useCalendarStore((state) => state.currentDate)
  const setCurrentDate = useCalendarStore((state) => state.setCurrentDate)

  const days = getDaysInMonth(miniDate)
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{formatMonthYear(miniDate)}</h3>
        <div className="flex gap-1">
          <button
            onClick={() => setMiniDate(subMonths(miniDate, 1))}
            className="p-1 hover:bg-cal-border rounded"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            onClick={() => setMiniDate(addMonths(miniDate, 1))}
            className="p-1 hover:bg-cal-border rounded"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-400 py-2">
            {day}
          </div>
        ))}

        {days.map((day) => {
          const isCurrentMonth = isDateInMonth(day, miniDate)
          const isTodayDate = isToday(day)
          const isSelected = format(day, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')

          return (
            <button
              key={format(day, 'yyyy-MM-dd')}
              onClick={() => setCurrentDate(day)}
              className={`
                p-2 text-sm rounded text-center transition
                ${!isCurrentMonth && 'text-gray-600'}
                ${isTodayDate && 'bg-blue-600 text-white font-bold'}
                ${isSelected && !isTodayDate && 'bg-cal-border'}
                ${!isTodayDate && !isSelected && 'hover:bg-cal-border'}
              `}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}
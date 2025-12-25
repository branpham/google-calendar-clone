import React, { useState } from 'react'
import { useCalendarStore } from '../../store/calendarStore'
import { FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi'

export const CalendarList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)
  const calendars = useCalendarStore((state) => state.calendars)
  const toggleCalendarVisibility = useCalendarStore((state) => state.toggleCalendarVisibility)
  const addCalendar = useCalendarStore((state) => state.addCalendar)

  const handleAddCalendar = () => {
    addCalendar({
      id: Date.now().toString(),
      name: 'New Calendar',
      description: '',
      color: '#039BE5',
      visible: true,
      owner: 'user@example.com',
      timeZone: 'America/New_York'
    })
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full font-semibold hover:bg-cal-border p-2 rounded"
      >
        <span>My calendars</span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {isOpen && (
        <div className="space-y-2 ml-4">
          {calendars.map((calendar) => (
            <label
              key={calendar.id}
              className="flex items-center gap-3 p-2 hover:bg-cal-border rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={calendar.visible}
                onChange={() => toggleCalendarVisibility(calendar.id)}
                className="w-4 h-4 rounded"
              />
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: calendar.color }}
              />
              <span className="flex-1 text-sm">{calendar.name}</span>
            </label>
          ))}
          <button
            onClick={handleAddCalendar}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 ml-2 text-sm"
          >
            <FiPlus size={16} />
            Create calendar
          </button>
          <div className="mt-4">
            <span className="font-semibold">Tags</span>
            <div className="text-gray-400 text-sm">Tag management coming soon</div>
          </div>
        </div>
      )}
    </div>
  )
}
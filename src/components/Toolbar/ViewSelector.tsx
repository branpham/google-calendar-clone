import React, { useState } from 'react'
import { useCalendarStore } from '../../store/calendarStore'
import { ViewType } from '../../types/calendar'
import { FiChevronDown } from 'react-icons/fi'

interface ViewSelectorProps {
  currentView: ViewType
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({ currentView }) => {
  const [isOpen, setIsOpen] = useState(false)
  const setCurrentView = useCalendarStore((state) => state.setCurrentView)

  const views: { label: string; value: ViewType }[] = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-cal-border rounded transition"
      >
        {views.find((v) => v.value === currentView)?.label || 'Month'}
        <FiChevronDown size={18} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-cal-border rounded-lg shadow-lg z-50 min-w-40">
          {views.map((view) => (
            <button
              key={view.value}
              onClick={() => {
                setCurrentView(view.value)
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
            >
              {view.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
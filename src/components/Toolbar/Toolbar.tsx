import React from 'react'
import { useCalendarStore } from '../../store/calendarStore'
import { ViewSelector } from './ViewSelector'
import { DateNavigator } from './DateNavigator'
import { FiPlus } from 'react-icons/fi'
import { formatMonthYear } from '../../utils/dateUtils'

export const Toolbar: React.FC = () => {
  const currentDate = useCalendarStore((state) => state.currentDate)
  const currentView = useCalendarStore((state) => state.currentView)
  const setEventEditorOpen = useCalendarStore((state) => state.setEventEditorOpen)

  return (
    <header className="border-b border-cal-border bg-cal-bg">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">📅 Calendar</h1>
        </div>

        <div className="flex items-center gap-4">
          <DateNavigator />
          <div className="text-lg font-medium">{formatMonthYear(currentDate)}</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEventEditorOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
          >
            <FiPlus size={20} />
            Create
          </button>
          <ViewSelector currentView={currentView} />
        </div>
      </div>
    </header>
  )
}
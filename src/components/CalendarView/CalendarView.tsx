import React from 'react'
import { useCalendarStore } from '../../store/calendarStore'
import { MonthView } from './MonthView'
import { WeekView } from './WeekView'
import { DayView } from './DayView'
import { YearView } from './YearView'

export const CalendarView: React.FC = () => {
  const currentView = useCalendarStore((state) => state.currentView)

  return (
    <div className="flex-1 overflow-hidden">
      {currentView === 'month' && <MonthView />}
      {currentView === 'week' && <WeekView />}
      {currentView === 'day' && <DayView />}
      {currentView === 'year' && <YearView />}
    </div>
  )
}
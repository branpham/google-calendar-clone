import React from 'react'
import { Sidebar } from './Sidebar/Sidebar'
import { Toolbar } from './Toolbar/Toolbar'
import { CalendarView } from './CalendarView/CalendarView'

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <CalendarView />
      </div>
    </div>
  )
}
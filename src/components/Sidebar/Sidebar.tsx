import React, { useState } from 'react'
import { MiniCalendar } from './MiniCalendar'
import { CalendarList } from './CalendarList'
import { FiMenu, FiX } from 'react-icons/fi'

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-50 md:hidden p-2 hover:bg-cal-border rounded"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative md:translate-x-0 left-0 top-16 h-[calc(100%-64px)] w-64 bg-cal-bg border-r border-cal-border overflow-y-auto transition-transform md:transition-none z-40`}
      >
        <div className="p-4 space-y-6">
          <MiniCalendar />
          <div className="border-t border-cal-border" />
          <CalendarList />
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
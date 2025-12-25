import React, { useEffect } from 'react'
import { Layout } from './components/Layout'
import { useCalendarStore } from 'src/store/calendarStore'
import { EventEditor } from './components/EventEditor/EventEditor'

function App() {
  const isEventEditorOpen = useCalendarStore((state) => state.isEventEditorOpen)
  const setEventEditorOpen = useCalendarStore((state) => state.setEventEditorOpen)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'c' && !['input', 'textarea'].includes((e.target as any).tagName.toLowerCase())) {
        setEventEditorOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [setEventEditorOpen])

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Layout />
      {isEventEditorOpen && <EventEditor />}
    </div>
  )
}

export default App
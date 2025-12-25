import React, { useState } from 'react'
import { useCalendarStore } from '../../store/calendarStore'
import { Event } from '../../types/calendar'
import { FiX } from 'react-icons/fi'

export const EventEditor: React.FC = () => {
  const setEventEditorOpen = useCalendarStore((state) => state.setEventEditorOpen)
  const addEvent = useCalendarStore((state) => state.addEvent)
  const [title, setTitle] = useState('')

  const handleCreate = () => {
    if (title.trim()) {
      const newEvent: Event = {
        id: Date.now().toString(),
        title,
        description: '',
        startTime: new Date(),
        endTime: new Date(Date.now() + 3600000),
        allDay: false,
        timeZone: 'America/New_York',
        recurrence: null,
        location: '',
        color: 'peacock',
        availability: 'busy',
        visibility: 'default',
        notifications: [{ id: '1', type: 'notification', minutesBefore: 15 }],
        calendarId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      addEvent(newEvent)
      setEventEditorOpen(false)
      setTitle('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"></div>
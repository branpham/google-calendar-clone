import React, { useState } from 'react'
import { useCalendarStore } from '@/store/calendarStore'
import { FiX } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'

export const EventEditor: React.FC = () => {
  const setEventEditorOpen = useCalendarStore((state) => state.setEventEditorOpen)
  const addEvent = useCalendarStore((state) => state.addEvent)
  const selectedEvent = useCalendarStore((state) => state.selectedEvent)
  const updateEvent = useCalendarStore((state) => state.updateEvent)
  const calendars = useCalendarStore((state) => state.calendars)

  const [title, setTitle] = useState(selectedEvent?.title || '')
  const [description, setDescription] = useState(selectedEvent?.description || '')
  const [calendarId, setCalendarId] = useState(selectedEvent?.calendarId || calendars[0]?.id || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    if (selectedEvent) {
      updateEvent({
        ...selectedEvent,
        title,
        description,
        calendarId,
      })
    } else {
      addEvent({
        id: uuidv4(),
        title,
        description,
        calendarId,
        startDate: new Date(),
        endDate: new Date(),
        allDay: false,
        tags: [],
        notifications: [],
      })
    }

    setEventEditorOpen(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-cal-bg border border-cal-border rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b border-cal-border">
          <h2 className="text-lg font-semibold">{selectedEvent ? 'Edit Event' : 'Create Event'}</h2>
          <button
            onClick={() => setEventEditorOpen(false)}
            className="p-1 hover:bg-cal-border rounded transition"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-cal-border rounded border border-cal-border focus:outline-none focus:border-blue-500 text-cal-text"
              placeholder="Event title"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-cal-border rounded border border-cal-border focus:outline-none focus:border-blue-500 text-cal-text"
              placeholder="Event description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Calendar</label>
            <select
              value={calendarId}
              onChange={(e) => setCalendarId(e.target.value)}
              className="w-full px-3 py-2 bg-cal-border rounded border border-cal-border focus:outline-none focus:border-blue-500 text-cal-text"
            >
              {calendars.map((cal) => (
                <option key={cal.id} value={cal.id}>
                  {cal.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition"
            >
              {selectedEvent ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => setEventEditorOpen(false)}
              className="flex-1 bg-cal-border hover:bg-gray-600 text-cal-text px-4 py-2 rounded font-medium transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
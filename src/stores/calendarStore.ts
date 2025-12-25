import { create } from 'zustand'
import { Event, Calendar, ViewType } from '../types/calendar'
import { addMonths } from 'date-fns'

export const useCalendarStore = create<{
  calendars: Calendar[]
  events: Event[]
  currentDate: Date
  currentView: ViewType
  selectedEvent: Event | null
  isEventEditorOpen: boolean
  setCurrentDate: (date: Date) => void
  setCurrentView: (view: ViewType) => void
  addEvent: (event: Event) => void
  updateEvent: (event: Event) => void
  deleteEvent: (eventId: string) => void
  selectEvent: (event: Event | null) => void
  setEventEditorOpen: (isOpen: boolean) => void
  addCalendar: (calendar: Calendar) => void
  updateCalendar: (calendar: Calendar) => void
  deleteCalendar: (calendarId: string) => void
  toggleCalendarVisibility: (calendarId: string) => void
  nextMonth: () => void
  previousMonth: () => void
  goToToday: () => void
  filterEventsByTag: (tag: string) => Event[]
  updateNotificationPriority: (eventId: string, notificationId: string, priority: 'low' | 'medium' | 'high') => void
}>((set, get) => {
  const loadState = () => {
    try {
      const saved = localStorage.getItem('calendarState')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  }

  const savedState = loadState()

  return {
    calendars: savedState?.calendars || [
      {
        id: '1',
        name: 'My Calendar',
        description: 'Your personal calendar',
        color: '#039BE5',
        visible: true,
        owner: 'user@example.com',
        timeZone: 'America/New_York',
      }
    ],
    events: savedState?.events || [],
    currentDate: savedState?.currentDate ? new Date(savedState.currentDate) : new Date(),
    currentView: 'month',
    selectedEvent: null,
    isEventEditorOpen: false,

    setCurrentDate: (date: Date) => {
      set({ currentDate: date })
      saveState(get())
    },

    setCurrentView: (view: ViewType) => {
      set({ currentView: view })
      saveState(get())
    },

    addEvent: (event: Event) => {
      set((state) => ({
        events: [...state.events, event]
      }))
      saveState(get())
    },

    updateEvent: (event: Event) => {
      set((state) => ({
        events: state.events.map((e) => e.id === event.id ? event : e)
      }))
      saveState(get())
    },

    deleteEvent: (eventId: string) => {
      set((state) => ({
        events: state.events.filter((e) => e.id !== eventId)
      }))
      saveState(get())
    },

    selectEvent: (event: Event | null) => {
      set({ selectedEvent: event })
    },

    setEventEditorOpen: (isOpen: boolean) => {
      set({ isEventEditorOpen: isOpen })
      if (!isOpen) {
        set({ selectedEvent: null })
      }
    },

    addCalendar: (calendar: Calendar) => {
      set((state) => ({
        calendars: [...state.calendars, calendar]
      }))
      saveState(get())
    },

    updateCalendar: (calendar: Calendar) => {
      set((state) => ({
        calendars: state.calendars.map((c) => c.id === calendar.id ? calendar : c)
      }))
      saveState(get())
    },

    deleteCalendar: (calendarId: string) => {
      set((state) => ({
        calendars: state.calendars.filter((c) => c.id !== calendarId),
        events: state.events.filter((e) => e.calendarId !== calendarId)
      }))
      saveState(get())
    },

    toggleCalendarVisibility: (calendarId: string) => {
      set((state) => ({
        calendars: state.calendars.map((c) =>
          c.id === calendarId ? { ...c, visible: !c.visible } : c
        )
      }))
      saveState(get())
    },

    nextMonth: () => {
      set((state) => ({
        currentDate: addMonths(state.currentDate, 1)
      }))
      saveState(get())
    },

    previousMonth: () => {
      set((state) => ({
        currentDate: addMonths(state.currentDate, -1)
      }))
      saveState(get())
    },

    goToToday: () => {
      set({ currentDate: new Date() })
      saveState(get())
    },

    filterEventsByTag: (tag: string) => {
      return get().events.filter((event) => event.tags.includes(tag))
    },

    updateNotificationPriority: (eventId: string, notificationId: string, priority: 'low' | 'medium' | 'high') => {
      set((state) => ({
        events: state.events.map((event) =>
          event.id === eventId
            ? {
                ...event,
                notifications: event.notifications.map((notification) =>
                  notification.id === notificationId ? { ...notification, priority } : notification
                ),
              }
            : event
        ),
      }))
      saveState(get())
    },
  }
})

function saveState(state: any) {
  try {
    localStorage.setItem('calendarState', JSON.stringify(state))
  } catch (e) {
    console.error('Failed to save state:', e)
  }
}
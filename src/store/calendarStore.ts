import { create } from 'zustand';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  allDay?: boolean;
}

interface CalendarStore {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),
  updateEvent: (id, updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      ),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));

export type ViewType = 'month' | 'week' | 'day' | 'year' | 'schedule'
export type ColorType = 'tomato' | 'flamingo' | 'tangerine' | 'banana' | 'sage' | 'basil' | 'peacock' | 'blueberry' | 'lavender' | 'grape' | 'graphite'
export type RecurrenceFrequency = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'

export interface Notification {
  id: string
  type: 'email' | 'notification'
  minutesBefore: number
}

export interface RecurrenceRule {
  frequency: RecurrenceFrequency
  interval: number
  endDate?: Date
  endAfter?: number
  daysOfWeek?: string[]
  daysOfMonth?: number[]
}

export interface Event {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  allDay: boolean
  timeZone: string
  recurrence: RecurrenceRule | null
  location: string
  color: ColorType
  availability: 'busy' | 'free'
  visibility: 'default' | 'public' | 'private'
  notifications: Notification[]
  calendarId: string
  createdAt: Date
  updatedAt: Date
}

export interface Calendar {
  id: string
  name: string
  description: string
  color: string
  visible: boolean
  owner: string
  timeZone: string
}
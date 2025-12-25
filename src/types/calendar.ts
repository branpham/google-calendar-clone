export type ViewType = 'day' | 'week' | 'month' | 'year' | 'schedule'
export type ColorType = 'tomato' | 'flamingo' | 'tangerine' | 'banana' | 'sage' | 'basil' | 'peacock' | 'blueberry' | 'lavender' | 'grape' | 'graphite'
export type RecurrenceFrequency = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'

export interface Notification {
  id: string
  type: 'email' | 'popup'
  minutesBefore: number
  priority: 'low' | 'medium' | 'high'
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
  description?: string
  startDate: Date
  endDate: Date
  allDay: boolean
  calendarId: string
  color?: string
  location?: string
  attendees?: string[]
  tags: string[]
  notifications: Notification[]
}

export interface Calendar {
  id: string
  name: string
  description?: string
  color: string
  visible: boolean
  owner?: string
  timeZone?: string
}
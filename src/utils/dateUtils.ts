import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
    startOfYear,
    endOfYear,
    eachMonthOfInterval,
  } from 'date-fns'
  
  export const getDaysInMonth = (date: Date): Date[] => {
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)
    const calendarStart = startOfWeek(monthStart)
    const calendarEnd = endOfWeek(monthEnd)
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  }
  
  export const isDateInMonth = (date: Date, monthDate: Date): boolean => {
    return isSameMonth(date, monthDate)
  }
  
  export const isToday = (date: Date): boolean => {
    return isSameDay(date, new Date())
  }
  
  export const formatTime = (date: Date): string => {
    return format(date, 'h:mm a')
  }
  
  export const formatMonthYear = (date: Date): string => {
    return format(date, 'MMMM yyyy')
  }
  
  export const formatShortDate = (date: Date): string => {
    return format(date, 'EEE, MMM d')
  }
  
  export const getEventDuration = (start: Date, end: Date): string => {
    const hours = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60))
    const minutes = Math.floor(((end.getTime() - start.getTime()) / (1000 * 60)) % 60)
    if (hours === 0) return `${minutes} min`
    if (minutes === 0) return `${hours} hr`
    return `${hours}h ${minutes}m`
  }
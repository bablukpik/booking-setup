"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalendarProps {
  month: number
  year: number
  selectedDate: number
  onDateSelect: (date: number) => void
  onMonthChange: (month: number) => void
  onYearChange: (year: number) => void
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

export default function Calendar({ month, year, selectedDate, onDateSelect, onMonthChange }: CalendarProps) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const days = []

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: daysInPrevMonth - i,
      isCurrentMonth: false,
      isSelected: false,
    })
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
      isCurrentMonth: true,
      isSelected: i === selectedDate,
    })
  }

  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      isCurrentMonth: false,
      isSelected: false,
    })
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-foreground">
          {monthNames[month]} {year}
        </h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMonthChange(month === 0 ? 11 : month - 1)}
            className="h-8 w-8 p-0 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMonthChange(month === 11 ? 0 : month + 1)}
            className="h-8 w-8 p-0 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground h-8 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid - adjusted spacing and styling for better match */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => day.isCurrentMonth && onDateSelect(day.date)}
            className={`h-8 w-8 flex items-center justify-center rounded text-sm font-medium transition-colors cursor-pointer ${
              day.isSelected
                ? "bg-blue-600 text-white"
                : day.isCurrentMonth
                  ? "text-foreground hover:bg-gray-100"
                  : "text-muted-foreground"
            }`}
          >
            {day.date}
          </button>
        ))}
      </div>
    </div>
  )
}

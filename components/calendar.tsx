'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarProps {
  month: number;
  year: number;
  selectedDate: number;
  todayDate: number;
  onDateSelect: (date: number) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function Calendar({
  month,
  year,
  selectedDate,
  todayDate,
  onDateSelect,
  onMonthChange,
}: CalendarProps) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: daysInPrevMonth - i,
      isCurrentMonth: false,
      isSelected: i === selectedDate,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
      isCurrentMonth: true,
      isSelected: i === selectedDate,
    });
  }

  // Next month days
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      isCurrentMonth: false,
      isSelected: false,
    });
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
            className="text-center text-xs font-medium text-[#71717A] h-8 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <button
            key={`${year}-${month}-${day.date}-${index}`}
            type="button"
            onClick={() => day.isCurrentMonth && onDateSelect(day.date)}
            className={`h-8 w-8 flex items-center justify-center text-sm text-[#2D3035] font-medium transition-all cursor-pointer ${
              day.isSelected && day.isCurrentMonth
                ? // Selected date always shows filled blue background (including if today is selected)
                  'bg-[#072AC8] text-white rounded-full'
                : day.isCurrentMonth && day.date === todayDate
                  ? // Today shows border only when NOT selected
                    'border border-[#000000] rounded-full'
                  : day.isCurrentMonth
                    ? 'hover:bg-gray-100 rounded-full'
                    : 'text-[#71717A]'
            }`}
            disabled={!day.isCurrentMonth}
          >
            {day.date}
          </button>
        ))}
      </div>
    </div>
  );
}

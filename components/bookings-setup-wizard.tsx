"use client"

import { useState } from "react"
import { ChevronRight, X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Sidebar from "@/components/sidebar"
import Calendar from "@/components/calendar"
import { Switch } from "@/components/ui/switch"

export default function BookingsSetupWizard() {
  const [serviceType, setServiceType] = useState("hair-salon")
  const [businessHours, setBusinessHours] = useState({
    Sunday: { enabled: false, start: "9:00 AM", end: "7:00 PM" },
    Monday: { enabled: true, start: "9:00 AM", end: "7:00 PM" },
    Tuesday: { enabled: true, start: "9:00 AM", end: "7:00 PM" },
    Wednesday: { enabled: true, start: "9:00 AM", end: "7:00 PM" },
    Thursday: { enabled: true, start: "9:00 AM", end: "7:00 PM" },
    Friday: { enabled: true, start: "9:00 AM", end: "7:00 PM" },
    Saturday: { enabled: false, start: "9:00 AM", end: "7:00 PM" },
  })
  const [selectedDate, setSelectedDate] = useState(24)
  const [selectedMonth, setSelectedMonth] = useState(11) // November
  const [selectedYear, setSelectedYear] = useState(2024)
  const [partialAvailabilityEnabled, setPartialAvailabilityEnabled] = useState(false)
  const [blackoutDates, setBlackoutDates] = useState([
    { date: "Nov 24, 2024", time: null },
    { date: "Nov 24, 2024 - 11 AM - 1 PM", time: "11 AM - 1 PM" },
  ])
  const [partialStartTime, setPartialStartTime] = useState("11:00 AM")
  const [partialEndTime, setPartialEndTime] = useState("1:00 PM")
  const [selectedDay, setSelectedDay] = useState<string | null>("Monday")
  const [editingStartTime, setEditingStartTime] = useState("9:00 AM")
  const [editingEndTime, setEditingEndTime] = useState("7:00 PM")

  const toggleDay = (day: string) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        enabled: !prev[day as keyof typeof prev].enabled,
      },
    }))
  }

  const handleDayClick = (day: string) => {
    if (businessHours[day as keyof typeof businessHours].enabled) {
      setSelectedDay(day)
      const dayHours = businessHours[day as keyof typeof businessHours]
      setEditingStartTime(dayHours.start)
      setEditingEndTime(dayHours.end)
    }
  }

  const handleSaveHours = () => {
    if (selectedDay) {
      setBusinessHours((prev) => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay as keyof typeof prev],
          start: editingStartTime,
          end: editingEndTime,
        },
      }))
    }
  }

  const handleCancelHours = () => {
    if (selectedDay) {
      const dayHours = businessHours[selectedDay as keyof typeof businessHours]
      setEditingStartTime(dayHours.start)
      setEditingEndTime(dayHours.end)
    }
  }

  // Generate time options (12-hour format with 30-minute intervals)
  const generateTimeOptions = () => {
    const times = []
    // AM hours
    for (let hour = 1; hour <= 11; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const minuteStr = minute === 0 ? "00" : minute.toString()
        times.push(`${hour}:${minuteStr} AM`)
      }
    }
    // 12 PM
    times.push("12:00 PM")
    times.push("12:30 PM")
    // PM hours
    for (let hour = 1; hour <= 11; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const minuteStr = minute === 0 ? "00" : minute.toString()
        times.push(`${hour}:${minuteStr} PM`)
      }
    }
    return times
  }

  const timeOptions = generateTimeOptions()

  const removeBlackoutDate = (index: number) => {
    setBlackoutDates((prev) => prev.filter((_, i) => i !== index))
  }

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="min-h-screen p-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Bookings setup</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="h-2 w-12 bg-blue-600 rounded"></div>
                  <div className="h-2 w-12 bg-gray-300 rounded"></div>
                  <div className="h-2 w-12 bg-gray-300 rounded"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">STEP 1 / 3</span>
              <div className="flex gap-2">
                <Button variant="outline" className="px-6 bg-transparent cursor-pointer">
                  Cancel
                </Button>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 cursor-pointer">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Business Details */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6 text-foreground">Business details</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      What type of service do you offer?
                    </label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hair-salon">Hair salon - Barbershop - etc</SelectItem>
                        <SelectItem value="fitness">Fitness Studio</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Business Hours */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-2 text-foreground">Your business hours</h2>
                <p className="text-sm text-muted-foreground mb-6">When can clients book with you?</p>

                <div className="space-y-0">
                  {days.map((day) => (
                    <div
                      key={day}
                      className={`flex items-center justify-between py-4 px-0 border-b border-border last:border-b-0 ${
                        businessHours[day as keyof typeof businessHours].enabled ? "cursor-pointer" : ""
                      }`}
                      onClick={() => handleDayClick(day)}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <Switch
                          checked={businessHours[day as keyof typeof businessHours].enabled}
                          onCheckedChange={() => toggleDay(day)}
                          className="data-[state=checked]:bg-blue-600"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className="font-medium text-foreground text-sm">{day}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground min-w-max">
                          {businessHours[day as keyof typeof businessHours].enabled
                            ? `${businessHours[day as keyof typeof businessHours].start} - ${businessHours[day as keyof typeof businessHours].end}`
                            : "Closed"}
                        </span>
                        {businessHours[day as keyof typeof businessHours].enabled && (
                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Blackout Dates & Time */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-2 text-foreground">Blackout dates & time</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Dates you're not available like holidays and special occasions
                </p>

                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <button className="text-blue-600 font-semibold text-sm flex items-center gap-2 hover:text-blue-700 cursor-pointer">
                    SET DATES
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <p className="text-sm text-blue-600 font-medium mt-1">Select times</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {blackoutDates.map((item, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      <span className="text-foreground">{item.date}</span>
                      <button
                        onClick={() => removeBlackoutDate(index)}
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column - Day Setup & Calendar */}
            <div className="space-y-8">
              {/* Day Setup */}
              {selectedDay && businessHours[selectedDay as keyof typeof businessHours].enabled ? (
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-1 text-foreground">{selectedDay}</h3>
                  <p className="text-sm text-muted-foreground mb-6">Set opening and closing hours</p>

                  <div className="flex gap-3 mb-6">
                    <Select value={editingStartTime} onValueChange={setEditingStartTime}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={editingEndTime} onValueChange={setEditingEndTime}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent cursor-pointer"
                      onClick={handleCancelHours}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      onClick={handleSaveHours}
                    >
                      Save
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-1 text-foreground">Select a day</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on an enabled day in the business hours section to set its opening and closing hours.
                  </p>
                </Card>
              )}

              {/* Calendar */}
              <Card className="p-6">
                <Calendar
                  month={selectedMonth}
                  year={selectedYear}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  onMonthChange={setSelectedMonth}
                  onYearChange={setSelectedYear}
                />
              </Card>

              {/* Partial Availability */}
              <Card className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Checkbox
                    checked={partialAvailabilityEnabled}
                    onCheckedChange={setPartialAvailabilityEnabled}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">Set partial availability</h4>
                    <p className="text-sm text-muted-foreground">Block out time on a specific day</p>
                  </div>
                </div>

                {partialAvailabilityEnabled && (
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Select value={partialStartTime} onValueChange={setPartialStartTime}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                          <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                          <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={partialEndTime} onValueChange={setPartialEndTime}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                          <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                          <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                          <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <p className="text-sm font-medium text-foreground">November 24</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-muted-foreground">
                          {partialStartTime} - {partialEndTime}
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                          <Clock className="h-3 w-3" />
                          2h
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Bottom Save Button */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent cursor-pointer">
                  Cancel
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 cursor-pointer">
                  Save
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

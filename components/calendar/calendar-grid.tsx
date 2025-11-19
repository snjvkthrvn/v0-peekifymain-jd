"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Play, Clock, Music2, Disc3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CalendarDay } from './calendar-day'
import type { SongOfTheDay } from '@/types'
import { cn } from '@/lib/utils'

interface CalendarGridProps {
  songs: Record<string, SongOfTheDay>
  onDayClick: (date: string) => void
  'aria-label'?: string
}

export function CalendarGrid({ songs, onDayClick, 'aria-label': ariaLabel }: CalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const startingDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const canGoNext = () => {
    const today = new Date()
    return year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth())
  }

  const isCurrentMonth = () => {
    const today = new Date()
    return year === today.getFullYear() && month === today.getMonth()
  }

  const days = []
  
  // Empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} aria-hidden="true" />)
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const song = songs[dateStr]
    const date = new Date(year, month, day)
    const today = new Date()
    const isFuture = date > today
    const isToday = date.toDateString() === today.toDateString()

    days.push(
      <CalendarDay
        key={dateStr}
        date={dateStr}
        day={day}
        song={song}
        isFuture={isFuture}
        isToday={isToday}
        onClick={() => !isFuture && song && onDayClick(dateStr)}
      />
    )
  }

  const monthSongs = Object.values(songs).filter(s => {
    const songDate = new Date(s.date)
    return songDate.getMonth() === month && songDate.getFullYear() === year
  })

  const monthStats = {
    daysTracked: monthSongs.length,
    totalPlays: monthSongs.reduce((sum, s) => sum + s.playCount, 0),
    hoursListened: Math.round(monthSongs.reduce((sum, s) => sum + s.totalListeningTimeMs, 0) / (1000 * 60 * 60)),
    uniqueArtists: new Set(monthSongs.map(s => s.song.artist)).size,
  }

  return (
    <div className="space-y-6" aria-label={ariaLabel || 'Music calendar'}>
      <div className="bg-bg-surface rounded-2xl p-6 border-b border-white/5">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-display font-black" id="calendar-month-label">
            {monthNames[month]} {year}
            {isCurrentMonth() && (
              <span className="ml-3 inline-block w-2 h-2 rounded-full bg-accent-green" />
            )}
          </h2>
          <div className="flex gap-2" role="group" aria-label="Calendar navigation">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={previousMonth}
              aria-label={`Go to ${monthNames[month - 1] || monthNames[11]} ${month === 0 ? year - 1 : year}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextMonth}
              disabled={!canGoNext()}
              aria-label={`Go to ${monthNames[month + 1] || monthNames[0]} ${month === 11 ? year + 1 : year}`}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="bg-bg-elevated rounded-xl p-4 text-center">
            <Play className="w-6 h-6 text-accent-green mx-auto mb-2" />
            <div className="text-display text-accent-green mb-1">{monthStats.daysTracked}</div>
            <div className="text-xs text-text-tertiary uppercase tracking-wide">Days</div>
          </div>
          
          <div className="bg-bg-elevated rounded-xl p-4 text-center">
            <Music2 className="w-6 h-6 text-accent-green mx-auto mb-2" />
            <div className="text-display text-accent-green mb-1">{monthStats.totalPlays}</div>
            <div className="text-xs text-text-tertiary uppercase tracking-wide">Plays</div>
          </div>
          
          <div className="bg-bg-elevated rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-accent-green mx-auto mb-2" />
            <div className="text-display text-accent-green mb-1">{monthStats.hoursListened}h</div>
            <div className="text-xs text-text-tertiary uppercase tracking-wide">Hours</div>
          </div>
          
          <div className="bg-bg-elevated rounded-xl p-4 text-center">
            <Disc3 className="w-6 h-6 text-accent-green mx-auto mb-2" />
            <div className="text-display text-accent-green mb-1">{monthStats.uniqueArtists}</div>
            <div className="text-xs text-text-tertiary uppercase tracking-wide">Artists</div>
          </div>
        </div>
      </div>

      <div className="bg-bg-surface rounded-2xl p-6">
        {/* Day headers */}
        <div 
          className="grid grid-cols-7 gap-2 mb-2"
          role="row"
        >
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <div 
              key={idx} 
              className="text-center py-2 text-sm font-semibold text-text-tertiary" 
              role="columnheader"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div 
          className="grid grid-cols-7 gap-2" 
          role="grid" 
          aria-labelledby="calendar-month-label"
        >
          {days}
        </div>
      </div>
    </div>
  )
}

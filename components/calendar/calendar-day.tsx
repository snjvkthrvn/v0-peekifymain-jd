"use client"

import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { SongOfTheDay } from '@/types'

interface CalendarDayProps {
  date: string
  day: number
  song?: SongOfTheDay
  isFuture: boolean
  isToday: boolean
  onClick: () => void
}

export function CalendarDay({ date, day, song, isFuture, isToday, onClick }: CalendarDayProps) {
  if (isFuture) {
    return (
      <div className={cn(
        "aspect-square rounded-xl bg-bg-surface",
        "flex items-center justify-center",
        "opacity-30 cursor-not-allowed"
      )}>
        <span className="text-sm text-text-tertiary">{day}</span>
      </div>
    )
  }

  if (!song) {
    return (
      <button
        onClick={onClick}
        disabled
        className={cn(
          'aspect-square rounded-xl transition-colors flex items-center justify-center',
          'bg-bg-elevated border border-dashed border-white/10',
          isToday && 'border-reveal-yellow border-solid border-2 shadow-[0_0_40px_rgba(255,235,59,0.3)]'
        )}
      >
        <span className={cn(
          "text-sm",
          isToday ? 'text-reveal-yellow font-bold' : 'text-text-tertiary'
        )}>
          {day}
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'aspect-square rounded-xl overflow-hidden relative group',
        'transition-all duration-300',
        'border-2 border-transparent hover:border-accent-green hover:scale-105',
        'shadow-[0_8px_24px_rgba(0,0,0,0.4)]',
        isToday && 'border-reveal-yellow shadow-[0_0_40px_rgba(255,235,59,0.3)]'
      )}
    >
      {/* Album art background */}
      <Image
        src={song.song.albumArtUrl || '/placeholder.svg?height=100&width=100&query=album'}
        alt={song.song.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 14vw, 8vw"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      
      {/* Day number badge */}
      <div className={cn(
        "absolute bottom-2 left-2 text-xs font-semibold px-1.5 py-0.5 rounded",
        isToday ? 'bg-reveal-yellow text-bg-deep' : 'bg-bg-deep/80 text-white'
      )}>
        {day}
      </div>
    </button>
  )
}

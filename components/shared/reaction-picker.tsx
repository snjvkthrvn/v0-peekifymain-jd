"use client"

import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const EMOJIS = ['🔥', '❤️', '💀', '😭', '🎯', '👀', '🤔', '😍'] as const

export type ReactionEmoji = typeof EMOJIS[number]

interface ReactionPickerProps {
  onSelect: (emoji: ReactionEmoji) => void
  currentReaction?: ReactionEmoji
  trigger: React.ReactNode
}

export function ReactionPicker({ onSelect, currentReaction, trigger }: ReactionPickerProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (emoji: ReactionEmoji) => {
    onSelect(emoji)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-3 bg-bg-elevated glass rounded-[20px] border border-glass-border"
        align="center"
        sideOffset={8}
      >
        <div className="grid grid-cols-4 gap-2">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleSelect(emoji)}
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center text-[28px] transition-all duration-200',
                'hover:bg-bg-highlight hover:scale-110 active:scale-95',
                currentReaction === emoji && 'bg-bg-highlight ring-2 ring-accent-green'
              )}
              aria-label={`React with ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

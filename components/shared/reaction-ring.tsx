"use client"

import { useState } from 'react'
import { ProfilePicture } from './profile-picture'
import type { Reaction } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface ReactionRingProps {
  reactions: Reaction[]
  maxVisible?: number
  onViewAll?: () => void
  className?: string
}

export function ReactionRing({ reactions, maxVisible = 12, onViewAll, className }: ReactionRingProps) {
  const [open, setOpen] = useState(false)
  const visibleReactions = reactions.slice(0, maxVisible)
  const remainingCount = reactions.length - visibleReactions.length

  if (reactions.length === 0) return null

  const radius = 45 // percentage from center
  const angleStep = 360 / Math.min(visibleReactions.length, maxVisible)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={cn('absolute inset-0', className)} role="button" tabIndex={0}>
          {/* Reaction bubbles in a circle */}
          {visibleReactions.map((reaction, index) => {
            const angle = (angleStep * index * Math.PI) / 180
            const x = 50 + radius * Math.cos(angle)
            const y = 50 + radius * Math.sin(angle)
            const delay = index * 80 // Stagger animation

            return (
              <div
                key={reaction.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-spring-in"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  animationDelay: `${delay}ms`,
                }}
              >
                <div className="relative">
                  {/* Profile picture with border */}
                  <div className="w-9 h-9 rounded-full border-[3px] border-bg-deep shadow-[0_8px_24px_rgba(0,0,0,0.4)] overflow-hidden">
                    <ProfilePicture
                      src={reaction.user.profilePictureUrl}
                      username={reaction.user.username}
                      size="sm"
                      className="border-0"
                    />
                  </div>
                  {/* Emoji overlay */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] flex items-center justify-center text-xs bg-bg-deep rounded-full border-[2px] border-bg-deep">
                    {reaction.emoji}
                  </div>
                </div>
              </div>
            )
          })}
          
          {/* "+N More" pill */}
          {remainingCount > 0 && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 h-9 px-3 rounded-full bg-bg-elevated border-[3px] border-bg-deep flex items-center justify-center text-xs font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.4)] animate-spring-in"
              style={{ 
                left: '50%', 
                top: '10%',
                animationDelay: `${visibleReactions.length * 80}ms`
              }}
            >
              +{remainingCount}
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="bg-bg-elevated">
        <DialogHeader>
          <DialogTitle className="text-display">Reactions ({reactions.length})</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {reactions.map((reaction) => (
            <div 
              key={reaction.id} 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-highlight transition-colors"
            >
              <ProfilePicture
                src={reaction.user.profilePictureUrl}
                username={reaction.user.username}
                size="md"
              />
              <div className="flex-1">
                <div className="font-semibold text-text-primary">{reaction.user.username}</div>
              </div>
              <div className="text-3xl">{reaction.emoji}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SpotifyLinkProps {
  uri: string
  type: 'track' | 'artist' | 'album'
  children: React.ReactNode
  className?: string
}

export function SpotifyLink({ uri, type, children, className }: SpotifyLinkProps) {
  const id = uri.split(':').pop()
  const url = `https://open.spotify.com/${type}/${id}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 text-text-secondary hover:text-accent-green transition-colors group",
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
    </a>
  )
}

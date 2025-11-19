"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Play, Music } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AlbumArtProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  priority?: boolean
  onClick?: () => void
  showPlayOverlay?: boolean
  className?: string
}

const sizeMap = {
  sm: 'w-12 h-12',
  md: 'w-[120px] h-[120px]',
  lg: 'w-[200px] h-[200px]',
  xl: 'w-[400px] h-[400px]',
  hero: 'w-full aspect-square',
}

export function AlbumArt({ 
  src, 
  alt, 
  size = 'md', 
  priority = false,
  onClick,
  showPlayOverlay = false,
  className 
}: AlbumArtProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const isClickable = !!onClick

  return (
    <div 
      className={cn(
        'relative overflow-hidden bg-bg-elevated rounded-[20px] group',
        sizeMap[size],
        isClickable && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 skeleton" />
      )}

      {/* Error state */}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-elevated">
          <Music className="w-1/3 h-1/3 text-text-tertiary" />
        </div>
      ) : (
        <Image
          src={src || '/placeholder.svg?height=400&width=400&query=album+art'}
          alt={alt}
          fill
          className={cn(
            'object-cover transition-all duration-300',
            isHovered && isClickable && 'scale-105'
          )}
          sizes={
            size === 'hero' 
              ? '100vw' 
              : size === 'xl'
              ? '400px'
              : size === 'lg'
              ? '200px'
              : size === 'md'
              ? '120px'
              : '48px'
          }
          priority={priority}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}

      {/* Play overlay on hover */}
      {showPlayOverlay && isHovered && !hasError && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-accent-green flex items-center justify-center shadow-glow-green">
            <Play className="w-8 h-8 text-bg-deep fill-bg-deep ml-1" />
          </div>
        </div>
      )}
      
      {/* Shadow effect */}
      <div className={cn(
        'absolute inset-0 rounded-[20px] transition-shadow duration-300',
        'shadow-[0_8px_24px_rgba(0,0,0,0.4)]',
        isHovered && isClickable && 'shadow-[0_0_40px_rgba(29,185,84,0.3)]'
      )} />
    </div>
  )
}

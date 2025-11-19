"use client"

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProfilePictureProps {
  src?: string
  username: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showOnlineIndicator?: boolean
  onClick?: () => void
  className?: string
}

const sizeMap = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-20 h-20 text-2xl',
  xl: 'w-40 h-40 text-5xl',
}

const indicatorSizeMap = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-5 h-5',
  xl: 'w-10 h-10',
}

export function ProfilePicture({ 
  src, 
  username, 
  size = 'md',
  showOnlineIndicator = false,
  onClick,
  className 
}: ProfilePictureProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const initial = username.charAt(0).toUpperCase()
  const isClickable = !!onClick

  return (
    <div 
      className={cn(
        'relative rounded-full overflow-hidden border-2 border-bg-deep',
        sizeMap[size],
        isClickable && 'cursor-pointer hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-shadow duration-200',
        className
      )}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {/* Loading skeleton */}
      {isLoading && src && (
        <div className="absolute inset-0 skeleton" />
      )}

      {/* Avatar image or fallback */}
      {src && !hasError ? (
        <Image
          src={src || "/placeholder.svg"}
          alt={username}
          fill
          className="object-cover"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-accent-green to-accent-green-hover flex items-center justify-center font-black">
          {initial}
        </div>
      )}

      {/* Online indicator */}
      {showOnlineIndicator && (
        <div className={cn(
          'absolute bottom-0 right-0 rounded-full bg-success border-2 border-bg-deep',
          indicatorSizeMap[size],
          'animate-pulse'
        )} />
      )}
    </div>
  )
}

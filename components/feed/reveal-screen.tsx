"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlbumArt } from '@/components/shared/album-art'
import { Button } from '@/components/ui/button'
import { Share2, Plus, X } from 'lucide-react'
import type { SongOfTheDay } from '@/types'
import { useToast } from '@/hooks/use-toast'
import Confetti from 'react-confetti'
import { cn } from '@/lib/utils'

interface RevealScreenProps {
  song: SongOfTheDay
  onShare?: () => void
  onQueue?: () => void
  onClose: () => void
}

type RevealStep = 'countdown' | 'album' | 'content'

export function RevealScreen({ song, onShare, onQueue, onClose }: RevealScreenProps) {
  const { toast } = useToast()
  const [step, setStep] = useState<RevealStep>('countdown')
  const [countdown, setCountdown] = useState(3)
  const [showConfetti, setShowConfetti] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  useEffect(() => {
    // Step 1: Countdown (0-2s)
    if (step === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 700)
        return () => clearTimeout(timer)
      } else {
        setTimeout(() => setStep('album'), 100)
      }
    }
    
    // Step 2: Album reveal (2-4s)
    if (step === 'album') {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        setStep('content')
        setTimeout(() => setShowConfetti(false), 5000)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [step, countdown])

  const handleShare = async () => {
    if (onShare) {
      onShare()
      return
    }
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Song of the Day',
          text: `${song.song.name} by ${song.song.artist}`,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: 'Link copied',
          description: 'Share your song with friends',
        })
      }
    } catch (error) {
      // User cancelled share
    }
  }

  const handleAddToQueue = async () => {
    if (onQueue) {
      onQueue()
      return
    }
    
    try {
      toast({
        title: 'Added to queue',
        description: `${song.song.name} by ${song.song.artist}`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add to queue',
        variant: 'destructive',
      })
    }
  }

  const [touchStart, setTouchStart] = useState(0)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY)
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientY
    if (touchEnd - touchStart > 100) {
      onClose()
    }
  }

  return (
    <motion.div 
      className={cn(
        "fixed inset-0 z-[9999]",
        "bg-black/95 backdrop-blur-[40px]",
        "flex items-center justify-center p-4 md:p-8",
        "overflow-y-auto"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={100}
          colors={['#1DB954', '#1ED760', '#FFEB3B', '#FF4081']}
          gravity={0.3}
        />
      )}

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </Button>

      <div 
        className="max-w-2xl w-full space-y-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {step === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: [0.8, 1.2, 0.8] }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ 
                scale: { 
                  repeat: Infinity, 
                  duration: 0.8,
                  ease: "easeInOut"
                },
                opacity: { duration: 0.3 }
              }}
              className="text-[120px] md:text-[180px] font-black text-reveal-yellow"
            >
              {countdown > 0 ? countdown : '🎵'}
            </motion.div>
          )}

          {step === 'album' && (
            <motion.div
              key="album"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotate: [-10, 10, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                scale: { duration: 0.8, times: [0, 0.6, 1] },
                rotate: { duration: 0.8 },
                ease: "easeOut"
              }}
              className="flex justify-center"
            >
              <div className="w-[400px] max-w-[90vw] md:w-[600px]">
                <AlbumArt
                  src={song.song.albumArtUrl}
                  alt={`${song.song.name} by ${song.song.artist}`}
                  size="hero"
                  priority
                  className="shadow-[0_0_80px_rgba(29,185,84,0.5)]"
                />
              </div>
            </motion.div>
          )}

          {step === 'content' && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Album Art */}
              <div className="flex justify-center">
                <div className="w-[400px] max-w-[90vw] md:w-[600px]">
                  <AlbumArt
                    src={song.song.albumArtUrl}
                    alt={`${song.song.name} by ${song.song.artist}`}
                    size="hero"
                    priority
                    className="shadow-[0_0_80px_rgba(29,185,84,0.5)]"
                  />
                </div>
              </div>

              {/* Song Info */}
              <div className="space-y-3">
                <h2 className="text-display font-black text-balance px-4">
                  {song.song.name}
                </h2>
                <p className="text-xl md:text-2xl text-text-secondary">
                  {song.song.artist}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4 px-4">
                <div className="bg-bg-elevated rounded-xl p-4 md:p-6">
                  <div className="text-3xl md:text-4xl font-black text-accent-green mb-1">
                    {song.playCount}
                  </div>
                  <div className="text-xs md:text-sm text-text-tertiary uppercase tracking-wide">
                    Plays
                  </div>
                </div>
                
                <div className="bg-bg-elevated rounded-xl p-4 md:p-6">
                  <div className="text-3xl md:text-4xl font-black text-accent-green mb-1">
                    {Math.round(song.totalListeningTimeMs / 60000)}m
                  </div>
                  <div className="text-xs md:text-sm text-text-tertiary uppercase tracking-wide">
                    Time
                  </div>
                </div>
                
                <div className="bg-bg-elevated rounded-xl p-4 md:p-6">
                  <div className="text-3xl md:text-4xl font-black text-reveal-yellow mb-1">
                    #1
                  </div>
                  <div className="text-xs md:text-sm text-text-tertiary uppercase tracking-wide">
                    Top Song
                  </div>
                </div>
              </div>

              <div className="space-y-3 px-4">
                <Button 
                  onClick={handleShare} 
                  size="lg"
                  className="w-full"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share to Feed
                </Button>
                
                <Button 
                  onClick={handleAddToQueue} 
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add to Queue
                </Button>
                
                <Button 
                  onClick={onClose} 
                  variant="ghost"
                  size="lg"
                  className="w-full text-text-tertiary"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

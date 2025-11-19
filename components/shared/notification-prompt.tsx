"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Bell, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { requestNotificationPermission, subscribeToPushNotifications } from '@/lib/notifications'
import { useToast } from '@/hooks/use-toast'

export function NotificationPrompt() {
  const [isVisible, setIsVisible] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if we should show the prompt
    const hasSeenPrompt = localStorage.getItem('notification_prompt_shown')
    const isSupported = 'Notification' in window && 'serviceWorker' in navigator
    
    if (isSupported && !hasSeenPrompt && Notification.permission === 'default') {
      // Show after a short delay
      const timer = setTimeout(() => setIsVisible(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleEnable = async () => {
    const granted = await requestNotificationPermission()
    if (granted) {
      const subscribed = await subscribeToPushNotifications()
      if (subscribed) {
        toast({
          title: "Notifications enabled!",
          description: "You'll be notified when your daily reveal is ready.",
        })
      }
    }
    dismissPrompt()
  }

  const dismissPrompt = () => {
    setIsVisible(false)
    localStorage.setItem('notification_prompt_shown', 'true')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-[400px] z-50"
        >
          <div className="bg-bg-elevated border border-border rounded-2xl shadow-2xl p-6 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-green/10 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none" />
            
            <button 
              onClick={dismissPrompt}
              className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green mb-2">
                <Bell className="w-6 h-6 animate-pulse" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">Never miss a reveal</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Get notified at 9:30pm when your song of the day is ready to be revealed.
                </p>
              </div>

              <ul className="text-sm text-text-secondary space-y-2 text-left w-full bg-bg-surface/50 p-4 rounded-xl">
                <li className="flex items-center gap-2">
                  <span className="text-accent-green">🔥</span> BeReal-style daily alerts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent-green">🎵</span> Discover your top song
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent-green">👥</span> See friends' music
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleEnable}
                className="w-full bg-gradient-to-r from-accent-green to-accent-green-light hover:opacity-90 text-white font-semibold h-12 rounded-xl shadow-lg shadow-accent-green/20"
              >
                Enable Notifications
              </Button>
              <Button 
                variant="ghost" 
                onClick={dismissPrompt}
                className="w-full text-text-secondary hover:text-text-primary"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar } from 'lucide-react'
import { ProfilePicture } from '@/components/shared/profile-picture'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/feed', icon: Home, label: 'Feed' },
  { href: '/calendar', icon: Calendar, label: 'Calendar' },
]

export function BottomNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <nav 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[100]",
        "h-[72px] md:hidden",
        "bg-bg-surface/70 backdrop-blur-[20px] backdrop-saturate-[180%]",
        "border-t border-white/5",
        "shadow-[0_-16px_48px_rgba(0,0,0,0.5)]",
        "pb-[env(safe-area-inset-bottom)]"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-full px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 transition-all duration-200',
                'min-w-[48px] min-h-[48px] rounded-full',
                'active:scale-95',
                isActive && 'bg-bg-highlight'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon 
                className={cn(
                  'w-6 h-6 transition-colors',
                  isActive ? 'text-accent-green' : 'text-text-tertiary'
                )} 
                aria-hidden="true" 
              />
              {isActive && (
                <span className="text-[11px] font-semibold text-accent-green animate-fade-in">
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
        
        <Link
          href={user ? `/profile/${user.username}` : '/profile'}
          className={cn(
            'flex flex-col items-center justify-center gap-1 transition-all duration-200',
            'min-w-[48px] min-h-[48px] rounded-full',
            'active:scale-95',
            (pathname.startsWith('/profile') || pathname.startsWith('/settings')) && 'bg-bg-highlight'
          )}
          aria-label="Profile"
          aria-current={(pathname.startsWith('/profile') || pathname.startsWith('/settings')) ? 'page' : undefined}
        >
          <ProfilePicture
            src={user?.profilePictureUrl}
            username={user?.username || 'User'}
            size="sm"
            className={cn(
              'transition-all',
              (pathname.startsWith('/profile') || pathname.startsWith('/settings')) && 'ring-2 ring-accent-green'
            )}
          />
          {(pathname.startsWith('/profile') || pathname.startsWith('/settings')) && (
            <span className="text-[11px] font-semibold text-accent-green animate-fade-in">
              Profile
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}

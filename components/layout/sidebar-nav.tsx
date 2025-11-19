"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, User, Settings, Music2, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

const navItems = [
  { href: '/feed', icon: Home, label: 'Feed' },
  { href: '/calendar', icon: Calendar, label: 'Calendar' },
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/settings', icon: Settings, label: 'Settings' },
]

export function SidebarNav() {
  const pathname = usePathname()
  const { logout, user } = useAuth()

  return (
    <aside 
      className={cn(
        "hidden md:flex flex-col",
        "fixed left-0 top-0 h-screen w-[240px]",
        "bg-bg-surface border-r border-white/5",
        "px-4 py-6"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <Link 
        href="/feed" 
        className="flex items-center gap-3 mb-8 px-2 py-2 rounded-lg focus:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-green/50"
        aria-label="Replay home"
      >
        <div className="relative w-8 h-8">
          <Music2 className="w-8 h-8 text-accent-green" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent-green">
              <path 
                d="M16 8C12.6863 8 10 10.6863 10 14" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              <path 
                d="M16 24C19.3137 24 22 21.3137 22 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <span className="text-2xl font-black">Replay</span>
      </Link>

      <nav className="flex-1 space-y-2" role="list">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              role="listitem"
              className={cn(
                'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 font-semibold relative',
                'focus:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-green/50',
                isActive
                  ? 'bg-accent-green/20 text-accent-green'
                  : 'text-text-secondary hover:bg-bg-highlight hover:text-text-primary'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-accent-green rounded-r-full" />
              )}
              <Icon className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <Button
        variant="outline"
        className={cn(
          "justify-start gap-3 w-full mt-auto",
          "text-error border-error hover:bg-error/10 hover:text-error hover:border-error"
        )}
        onClick={logout}
        aria-label="Log out of your account"
      >
        <LogOut className="w-4 h-4" aria-hidden="true" />
        Logout
      </Button>
    </aside>
  )
}

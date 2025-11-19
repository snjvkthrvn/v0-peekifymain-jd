"use client"

import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { PostCard } from '@/components/feed/post-card'
import { PostSkeleton } from '@/components/ui/loading-skeleton'
import { BottomNav } from '@/components/layout/bottom-nav'
import { SidebarNav } from '@/components/layout/sidebar-nav'
import { InstallPWAPrompt } from '@/components/shared/install-pwa-prompt'
import { ProfilePicture } from '@/components/shared/profile-picture'
import { Button } from '@/components/ui/button'
import { Bell, Music, UserPlus } from 'lucide-react'
import { feedApi } from '@/lib/api'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'

export default function FeedPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const observerTarget = useRef<HTMLDivElement>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam = 1 }) => feedApi.getFeed(pageParam, 20),
    getNextPageParam: (lastPage, pages) => 
      lastPage.hasMore ? pages.length + 1 : undefined,
    initialPageParam: 1,
    enabled: !!user,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { rootMargin: '400px' }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return null
  }

  const posts = data?.pages.flatMap((page) => page.posts) || []

  return (
    <div className="flex min-h-screen bg-bg-deep">
      <SidebarNav />
      
      <main className="flex-1 pb-24 md:pb-8 md:ml-[240px]" role="main">
        <header className={cn(
          "sticky top-0 z-10 h-16",
          "bg-bg-surface/70 backdrop-blur-[20px] backdrop-saturate-[180%]",
          "border-b border-white/5",
          "shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
        )}>
          <div className="max-w-[640px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Music className="w-8 h-8 text-accent-green" />
              <h1 className="text-2xl font-black">Replay</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="icon" size="icon" aria-label="Notifications">
                <Bell className="w-5 h-5" />
              </Button>
              <ProfilePicture
                src={user?.profilePictureUrl}
                username={user?.username || 'User'}
                size="sm"
              />
            </div>
          </div>
        </header>

        <div className="max-w-[640px] mx-auto px-4 py-6">
          {isLoading ? (
            <div className="space-y-6" role="status" aria-label="Loading feed">
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 space-y-6 animate-fade-in">
              <div className="flex justify-center">
                <div className="relative">
                  <Music className="w-24 h-24 text-text-tertiary" />
                  <span className="absolute -top-2 -right-2 text-4xl">❓</span>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-display text-text-secondary">No posts yet</h2>
                <p className="text-base text-text-tertiary max-w-md mx-auto text-balance">
                  Add friends to see their music
                </p>
              </div>
              <Button size="lg" className="rounded-full">
                <UserPlus className="w-5 h-5 mr-2" />
                Invite Friends
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-6" role="feed" aria-label="Music posts feed">
                {posts.map((post, index) => (
                  <PostCard 
                    key={post.id} 
                    post={post}
                    priority={index < 3}
                  />
                ))}
              </div>
              
              <div ref={observerTarget} className="h-px" aria-hidden="true" />
              
              {isFetchingNextPage && (
                <div className="flex flex-col items-center gap-3 py-8 animate-fade-in">
                  <Music className="w-12 h-12 text-accent-green animate-spin" />
                  <span className="text-text-secondary">Loading...</span>
                </div>
              )}
              
              {!hasNextPage && posts.length > 0 && (
                <div className="text-center py-8 text-text-secondary" role="status">
                  You're all caught up!
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <BottomNav />
      <InstallPWAPrompt />
    </div>
  )
}

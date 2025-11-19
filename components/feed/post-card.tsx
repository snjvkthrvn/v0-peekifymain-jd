"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProfilePicture } from '@/components/shared/profile-picture'
import { AlbumArt } from '@/components/shared/album-art'
import { ReactionRing } from '@/components/shared/reaction-ring'
import { ReactionPicker, type ReactionEmoji } from '@/components/shared/reaction-picker'
import { Button } from '@/components/ui/button'
import { MessageCircle, Plus, Share2, Heart, MoreVertical, Play, Clock, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Post } from '@/types'
import { reactionsApi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: Post
  priority?: boolean
}

export function PostCard({ post, priority = false }: PostCardProps) {
  const { toast } = useToast()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [showComments, setShowComments] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const currentUserReaction = post.reactions.find((r) => r.userId === user?.id)

  const reactionMutation = useMutation({
    mutationFn: async (emoji: ReactionEmoji) => {
      if (currentUserReaction) {
        if (currentUserReaction.emoji === emoji) {
          await reactionsApi.removeReaction(post.id)
        } else {
          await reactionsApi.addReaction(post.id, emoji)
        }
      } else {
        await reactionsApi.addReaction(post.id, emoji)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
      queryClient.invalidateQueries({ queryKey: ['post', post.id] })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to add reaction',
        variant: 'destructive',
      })
    },
  })

  const handleReaction = (emoji: ReactionEmoji) => {
    reactionMutation.mutate(emoji)
  }

  const handleAddToQueue = async () => {
    try {
      toast({
        title: 'Added to queue',
        description: `${post.song.name} by ${post.song.artist}`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add to queue',
        variant: 'destructive',
      })
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${post.user.username}'s song of the day`,
          text: `${post.song.name} by ${post.song.artist}`,
          url: `${window.location.origin}/post/${post.id}`,
        })
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`)
        toast({
          title: 'Link copied',
          description: 'Post link copied to clipboard',
        })
      }
    } catch (error) {
      // User cancelled share
    }
  }

  return (
    <article 
      className={cn(
        "w-full max-w-[640px] mx-auto",
        "bg-bg-elevated rounded-[28px] overflow-hidden",
        "shadow-[0_8px_24px_rgba(0,0,0,0.4)]",
        "transition-all duration-300",
        "hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] hover:-translate-y-1",
        "animate-fade-in"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`${post.user.username}'s song of the day`}
    >
      <div className="flex items-center justify-between p-4 bg-bg-surface">
        <Link 
          href={`/profile/${post.user.username}`} 
          className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-green/50 rounded-lg"
          aria-label={`View ${post.user.username}'s profile`}
        >
          <ProfilePicture
            src={post.user.profilePictureUrl}
            username={post.user.username}
            size="md"
          />
          <div>
            <div className="font-semibold text-base">{post.user.username}</div>
            <time 
              className="text-sm text-text-tertiary"
              dateTime={post.createdAt}
            >
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </time>
          </div>
        </Link>
        
        <Button variant="icon" size="icon-sm" aria-label="More options">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      <div className="relative aspect-square w-full group">
        <AlbumArt
          src={post.song.albumArtUrl}
          alt={`${post.song.name} by ${post.song.artist}`}
          size="hero"
          priority={priority}
          showPlayOverlay={true}
        />
        <ReactionRing reactions={post.reactions} className="pointer-events-none" />
        
        {isHovered && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-200 pointer-events-none">
            <span className="text-white font-semibold text-lg">View Details</span>
          </div>
        )}
      </div>

      <div className="p-4 bg-gradient-to-b from-accent-green/20 to-transparent">
        <h3 className="text-lg font-semibold text-balance leading-tight mb-1">{post.song.name}</h3>
        <p className="text-text-secondary text-base mb-3">{post.song.artist}</p>
        
        <div className="flex items-center gap-3 text-sm text-text-tertiary">
          <div className="flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5" />
            <span>{post.playCount}</span>
          </div>
          <span aria-hidden="true">•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{Math.round(post.totalListeningTimeMs / 60000)}m</span>
          </div>
          <span aria-hidden="true">•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDistanceToNow(new Date(post.createdAt))}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-3 bg-bg-surface border-t border-white/5" role="group" aria-label="Post actions">
        <ReactionPicker
          onSelect={handleReaction}
          currentReaction={currentUserReaction?.emoji as ReactionEmoji}
          trigger={
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-2 h-10 rounded-full",
                currentUserReaction && "text-accent-green"
              )}
              disabled={reactionMutation.isPending}
              aria-label="React to post"
            >
              <Heart className={cn("w-5 h-5", currentUserReaction && "fill-accent-green")} />
              <span className="text-sm font-medium">
                {currentUserReaction ? 'Reacted' : 'React'}
              </span>
            </Button>
          }
        />
        
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 h-10 rounded-full"
          onClick={() => setShowComments(!showComments)}
          aria-label={`View ${post.commentCount} comments`}
          aria-expanded={showComments}
        >
          <MessageCircle className="w-5 h-5" />
          {post.commentCount > 0 && (
            <span className="text-sm font-medium">{post.commentCount}</span>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 h-10 rounded-full" 
          onClick={handleAddToQueue}
          aria-label="Add to Spotify queue"
        >
          <Plus className="w-5 h-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 h-10 rounded-full ml-auto" 
          onClick={handleShare}
          aria-label="Share post"
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 pb-4 pt-2 bg-bg-surface space-y-4" role="region" aria-label="Comments">
          <div className="text-sm text-text-secondary">Comments coming soon...</div>
        </div>
      )}
    </article>
  )
}

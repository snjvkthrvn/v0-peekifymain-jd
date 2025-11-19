"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ProfilePicture } from '@/components/shared/profile-picture'
import { Button } from '@/components/ui/button'
import { Heart, Trash2, MoreHorizontal } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Comment {
  id: string
  userId: string
  username: string
  profilePic?: string
  text: string
  timestamp: string
  likeCount: number
  isLiked: boolean
}

interface CommentListProps {
  postId: string
  comments: Comment[]
  onLike: (commentId: string) => void
  onDelete: (commentId: string) => void
}

export function CommentList({ postId, comments, onLike, onDelete }: CommentListProps) {
  const { user } = useAuth()
  const [isExpanded, setIsExpanded] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null)

  const visibleComments = isExpanded ? comments : comments.slice(0, 3)
  const hasMore = comments.length > 3

  return (
    <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
      {comments.length === 0 ? (
        <div className="text-center py-6 text-text-secondary italic">
          No comments yet. Be the first!
        </div>
      ) : (
        <div className="space-y-4">
          {visibleComments.map((comment) => (
            <div key={comment.id} className="flex gap-3 group">
              <Link href={`/profile/${comment.username}`} className="shrink-0">
                <ProfilePicture
                  src={comment.profilePic}
                  username={comment.username}
                  size="xs"
                  className="mt-1"
                />
              </Link>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <Link 
                    href={`/profile/${comment.username}`}
                    className="font-semibold text-sm hover:underline"
                  >
                    {comment.username}
                  </Link>
                  <span className="text-xs text-text-tertiary">
                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                  </span>
                </div>
                
                <p className="text-sm text-text-primary break-words whitespace-pre-wrap leading-relaxed">
                  {comment.text}
                </p>
                
                <div className="flex items-center gap-4 mt-1">
                  <button
                    onClick={() => onLike(comment.id)}
                    className={cn(
                      "flex items-center gap-1 text-xs font-medium transition-colors",
                      comment.isLiked ? "text-accent-green" : "text-text-tertiary hover:text-text-secondary"
                    )}
                  >
                    <Heart className={cn(
                      "w-3.5 h-3.5 transition-transform active:scale-75",
                      comment.isLiked && "fill-current"
                    )} />
                    {comment.likeCount > 0 && <span>{comment.likeCount}</span>}
                  </button>

                  {user?.id === comment.userId && (
                    <button
                      onClick={() => setCommentToDelete(comment.id)}
                      className="text-xs font-medium text-text-tertiary hover:text-error opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {hasMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-text-secondary hover:text-text-primary font-medium transition-colors w-full text-left pl-[44px]"
            >
              {isExpanded ? 'Show less' : `View all ${comments.length} comments`}
            </button>
          )}
        </div>
      )}

      <AlertDialog open={!!commentToDelete} onOpenChange={(open) => !open && setCommentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete comment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (commentToDelete) {
                  onDelete(commentToDelete)
                  setCommentToDelete(null)
                }
              }}
              className="bg-error hover:bg-error/90 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CommentInputProps {
  postId: string
  onSubmit: (text: string) => Promise<void>
  placeholder?: string
  autoFocus?: boolean
}

export function CommentInput({ 
  postId, 
  onSubmit, 
  placeholder = "Add a comment...", 
  autoFocus = false 
}: CommentInputProps) {
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [autoFocus])

  const handleSubmit = async () => {
    if (!text.trim() || isSubmitting || text.length > 500) return

    setIsSubmitting(true)
    try {
      await onSubmit(text)
      setText('')
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    // Auto-resize
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`
  }

  return (
    <div className="relative flex gap-2 items-end">
      <div className="relative flex-1">
        <Textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "min-h-[80px] max-h-[200px] resize-none pr-2 pb-8",
            "bg-bg-elevated border-border focus:border-accent-green focus:ring-accent-green/20",
            "transition-all duration-200"
          )}
          disabled={isSubmitting}
          maxLength={500}
        />
        <div className={cn(
          "absolute bottom-2 right-3 text-xs transition-colors",
          text.length > 450 ? "text-error" : "text-text-tertiary"
        )}>
          {text.length}/500
        </div>
      </div>
      
      <Button
        size="icon"
        className={cn(
          "h-10 w-10 rounded-full shrink-0 mb-1",
          "bg-gradient-to-br from-accent-green to-accent-green-light hover:shadow-lg hover:shadow-accent-green/20",
          "transition-all duration-300"
        )}
        onClick={handleSubmit}
        disabled={!text.trim() || isSubmitting || text.length > 500}
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin text-white" />
        ) : (
          <Send className="w-5 h-5 text-white ml-0.5" />
        )}
      </Button>
    </div>
  )
}

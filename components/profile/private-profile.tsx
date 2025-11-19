import { Lock, UserPlus } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface PrivateProfileProps {
  username: string
  onAddFriend: () => void
}

export function PrivateProfile({ username, onAddFriend }: PrivateProfileProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-24 h-24 rounded-full bg-elevated flex items-center justify-center mb-6">
        <Lock className="w-10 h-10 text-tertiary" />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
        This profile is private
      </h2>
      
      <p className="text-secondary text-body max-w-md mb-8">
        Add <span className="font-bold text-white">{username}</span> as a friend to see their music history, stats, and daily reveals.
      </p>
      
      <Button variant="primary" size="lg" onClick={onAddFriend} className="gap-2">
        <UserPlus className="w-5 h-5" />
        Send Friend Request
      </Button>
    </div>
  )
}

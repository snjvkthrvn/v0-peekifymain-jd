import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-[#1DB954] mx-auto" />
        <h1 className="text-xl font-semibold text-foreground">Connecting...</h1>
      </div>
    </div>
  )
}

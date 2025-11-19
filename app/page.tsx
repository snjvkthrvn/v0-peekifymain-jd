import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Music } from 'lucide-react'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen-safe bg-bg-deep">
      <header className="fixed top-0 left-0 right-0 z-50 glass safe-top">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-green/20 flex items-center justify-center">
                <Music className="h-5 w-5 text-accent-green" />
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tight">Replay</span>
            </div>
            <Link href="/auth/login">
              <Button 
                variant="ghost" 
                className="text-text-secondary hover:text-text-primary hover:bg-bg-highlight transition-colors"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Animated album mosaic background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/40 via-bg-deep/60 to-bg-deep z-10" />
          <div className="grid grid-cols-6 md:grid-cols-8 gap-2 animate-pulse">
            {Array.from({ length: 48 }).map((_, i) => (
              <div 
                key={i} 
                className="aspect-square bg-bg-elevated rounded-sm"
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  opacity: Math.random() * 0.5 + 0.2 
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-reveal-yellow/10 text-reveal-yellow text-sm font-semibold border border-reveal-yellow/20">
              BeReal for music
            </div>
            
            <h1 className="text-hero text-balance">
              Transform Your Spotify Listening Into{' '}
              <span className="gradient-spotify bg-clip-text text-transparent">Shareable Moments</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto text-pretty leading-relaxed">
              Automatically track your daily Spotify habits, reveal your song of the day at 9:30pm, and discover what friends are listening to.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/auth/login">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto h-14 px-8 text-base font-bold gradient-spotify hover:opacity-90 transition-opacity shadow-glow-green rounded-full"
                >
                  <Music className="mr-2 h-5 w-5" />
                  Continue with Spotify
                </Button>
              </Link>
            </div>

            <div className="pt-12">
              <div className="rounded-3xl bg-bg-elevated overflow-hidden shadow-large border border-border hover-lift">
                <Image 
                  src="/music-app-interface-with-album-art-and-social-feed.jpg" 
                  alt="Replay App Interface"
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-display text-center mb-16 text-balance">
              How Replay Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* Feature 1 */}
              <div className="group p-6 lg:p-8 rounded-2xl bg-bg-elevated border border-border hover:border-border-hover transition-all hover-lift">
                <div className="h-14 w-14 rounded-xl gradient-spotify flex items-center justify-center mb-6 shadow-glow-green">
                  <Music className="h-7 w-7 text-bg-deep" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Daily Reveals</h3>
                <p className="text-text-secondary leading-relaxed">
                  Get your song of the day at 9:30pm. Share it before it's gone.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-6 lg:p-8 rounded-2xl bg-bg-elevated border border-border hover:border-border-hover transition-all hover-lift">
                <div className="h-14 w-14 rounded-xl bg-accent-green/10 flex items-center justify-center mb-6 border border-accent-green/20">
                  <svg className="h-7 w-7 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Music Calendar</h3>
                <p className="text-text-secondary leading-relaxed">
                  Browse your listening history. Every day is a song.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-6 lg:p-8 rounded-2xl bg-bg-elevated border border-border hover:border-border-hover transition-all hover-lift">
                <div className="h-14 w-14 rounded-xl bg-reaction-pulse/10 flex items-center justify-center mb-6 border border-reaction-pulse/20">
                  <svg className="h-7 w-7 text-reaction-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Friend Reactions</h3>
                <p className="text-text-secondary leading-relaxed">
                  See what your friends are listening to. React with your vibe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <h2 className="text-display text-balance">
                  Share With Friends, Not Everyone
                </h2>
                <p className="text-lg text-text-secondary leading-relaxed text-pretty">
                  See what your friends are really listening to. React with BeReal-style profile pictures and emojis. No pressure, just authentic music discovery.
                </p>
                <ul className="space-y-5 pt-4">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full gradient-spotify flex items-center justify-center shrink-0 shadow-glow-green">
                      <svg className="w-5 h-5 text-bg-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-lg">Friends-Only Feed</div>
                      <div className="text-text-secondary">Your music stays between you and your friends</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-reaction-pulse/20 flex items-center justify-center shrink-0 border border-reaction-pulse/30">
                      <svg className="w-5 h-5 text-reaction-pulse" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-lg">Profile Picture Reactions</div>
                      <div className="text-text-secondary">React with your face + emoji, just like BeReal</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent-green/20 flex items-center justify-center shrink-0 border border-accent-green/30">
                      <Music className="w-5 h-5 text-accent-green" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Add to Queue</div>
                      <div className="text-text-secondary">One tap to add any friend's song to your Spotify</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-large border border-border hover-lift order-1 lg:order-2">
                <Image 
                  src="/social-music-feed-with-reactions.jpg" 
                  alt="Social Feed with Reactions"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-display text-balance">
              Ready to Start Your Music Diary?
            </h2>
            <p className="text-lg text-text-secondary text-pretty">
              Connect your Spotify account and start tracking your daily listening in seconds.
            </p>
            <Link href="/auth/login">
              <Button 
                size="lg" 
                className="h-14 px-8 text-base font-bold gradient-spotify hover:opacity-90 transition-opacity shadow-glow-green rounded-full"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-green/20 flex items-center justify-center">
                <Music className="h-4 w-4 text-accent-green" />
              </div>
              <span className="font-bold text-lg">Replay</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-text-secondary">
              <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-text-primary transition-colors">Terms</Link>
              <Link href="/support" className="hover:text-text-primary transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

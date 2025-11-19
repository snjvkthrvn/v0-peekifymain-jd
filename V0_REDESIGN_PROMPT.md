# Vercel v0 UI/UX Redesign Prompt: Replay App

## App Overview
**Replay** is a social music diary PWA that transforms daily Spotify listening into shareable moments. Think "BeReal for music" - users passively track their listening, receive daily "song reveals" at 9:30pm, browse their music calendar, and share reactions with friends.

---

## Design Philosophy: BeReal × Spotify Fusion

### From BeReal:
- **Authentic & Raw**: No over-polished UI, embrace imperfection
- **Time-Sensitive Magic**: Daily reveals with countdown urgency
- **Social-First Reactions**: Profile picture reaction bubbles as primary interaction
- **Minimal Chrome**: Full-screen content, hidden navigation until needed
- **Camera-Like Immediacy**: Snap-and-share mentality for music moments
- **Notification-Driven**: Push alerts drive core engagement

### From Spotify:
- **Bold Typography**: Extra-large, confident type hierarchy
- **Album-Art Driven**: Colors extracted from cover art dominate the UI
- **Gradient Overlays**: Smooth color transitions from album art
- **Immersive Cards**: Content feels like it's floating in space
- **Glassy Depth**: Frosted glass effects, subtle shadows, depth layers
- **Music-First Layout**: Album art is hero element, not decoration

---

## Global Design System

### Color Philosophy
**Dynamic Color Extraction**: Primary UI colors should adapt based on currently playing/revealed song's album art using Spotify's color extraction algorithm.

#### Base Palette (Dark Mode Primary):
\`\`\`
Background Layers:
- bg-deep: #000000 (true black for OLED)
- bg-surface: #121212 (Spotify's signature dark)
- bg-elevated: #1a1a1a (cards, modals)
- bg-highlight: rgba(255,255,255,0.1) (hover states)

Foreground:
- text-primary: #FFFFFF (high contrast)
- text-secondary: #B3B3B3 (Spotify's muted text)
- text-tertiary: #727272 (subtle labels)

Accent (Spotify DNA):
- accent-green: #1DB954 (primary CTA, success states)
- accent-gradient: linear-gradient(135deg, #1DB954 0%, #1ED760 100%)

Dynamic (Album-Derived):
- album-vibrant: Extract most vibrant color
- album-muted: Desaturated version for backgrounds
- album-gradient: 3-color gradient from album art (top-left → bottom-right)

BeReal-Inspired Alerts:
- reveal-yellow: #FFEB3B (notification badges, countdown timers)
- reaction-pulse: #FF4081 (reaction notifications)
\`\`\`

#### Light Mode Adjustments:
\`\`\`
- bg-deep: #FFFFFF
- bg-surface: #F6F6F6
- bg-elevated: #FFFFFF with shadow
- text-primary: #000000
- text-secondary: #555555
- Keep accent-green, reduce vibrant color saturation by 20%
\`\`\`

### Typography System (Spotify-Inspired Scale)

**Font Stack**:
- Primary: 'Circular Std' (Spotify's proprietary font, fallback to 'Inter' or system-ui)
- Monospace: 'JetBrains Mono' for timestamps, play counts

**Type Scale**:
\`\`\`
Hero (Album/Song Names):
- font-size: clamp(2.5rem, 8vw, 5rem)
- font-weight: 900 (Black)
- line-height: 0.9
- letter-spacing: -0.02em
- text-transform: none (preserve artist casing)

Display (Page Headers):
- font-size: clamp(2rem, 5vw, 3.5rem)
- font-weight: 800 (ExtraBold)
- line-height: 1.1
- letter-spacing: -0.01em

Body Large (Artist Names, Primary Content):
- font-size: 1.125rem (18px)
- font-weight: 600 (SemiBold)
- line-height: 1.4

Body (Main Content):
- font-size: 1rem (16px)
- font-weight: 400 (Regular)
- line-height: 1.6

Small (Metadata, Labels):
- font-size: 0.875rem (14px)
- font-weight: 500 (Medium)
- line-height: 1.5
- color: text-secondary

Caption (Timestamps, Stats):
- font-size: 0.75rem (12px)
- font-weight: 400
- line-height: 1.4
- text-transform: uppercase
- letter-spacing: 0.08em
- color: text-tertiary
\`\`\`

### Spacing System (8px Grid)
\`\`\`
xs: 4px   (tight inline spacing)
sm: 8px   (compact list spacing)
md: 16px  (default spacing, card padding)
lg: 24px  (section gaps)
xl: 32px  (page margins)
2xl: 48px (hero spacing)
3xl: 64px (section dividers)
\`\`\`

### Border Radius Scale
\`\`\`
sm: 4px   (input fields, small buttons)
md: 12px  (cards, standard buttons)
lg: 20px  (album art, featured cards)
xl: 28px  (modals, bottom sheets)
full: 9999px (pills, profile pictures, reaction bubbles)
\`\`\`

### Elevation & Shadows (Spotify Depth)
\`\`\`
shadow-subtle: 0 2px 8px rgba(0,0,0,0.3)
shadow-medium: 0 8px 24px rgba(0,0,0,0.4)
shadow-large: 0 16px 48px rgba(0,0,0,0.5)
shadow-glow: 0 0 40px var(--album-vibrant, #1DB954) at 30% opacity

Glassmorphism Effect:
- background: rgba(18, 18, 18, 0.7)
- backdrop-filter: blur(20px) saturate(180%)
- border: 1px solid rgba(255,255,255,0.1)
\`\`\`

---

## Page-by-Page Design Specifications

### 1. Landing Page (Unauthenticated)

**Layout**: Full-screen hero with animated album art mosaic background

**Hero Section**:
\`\`\`
- Full viewport height
- Background: Animated mosaic of 20+ album covers scrolling diagonally (slow infinite scroll)
- Overlay: Linear gradient (rgba(0,0,0,0.4) → rgba(0,0,0,0.8))
- Center Content:
  - Logo: "Replay" in Hero type scale (900 weight)
  - Tagline: "BeReal for music" in Body Large (text-secondary)
  - CTA Button: "Continue with Spotify"
    - Size: 56px height, 300px width
    - Style: accent-gradient background, rounded-full
    - Icon: Spotify logo (white) left-aligned
    - Hover: Scale 1.05, shadow-glow
    - Font: Body Large (600 weight)
\`\`\`

**Features Section** (3-column grid on desktop, stack on mobile):
\`\`\`
Each Feature Card:
- bg-elevated background
- 24px padding
- shadow-medium
- radius-lg
- Icon: 48x48px with accent-green fill
- Title: Display size, 800 weight
- Description: Body size, text-secondary

Feature 1: "Daily Reveals"
  - Icon: Clock with notification badge
  - Copy: "Get your song of the day at 9:30pm. Share it before it's gone."

Feature 2: "Music Calendar"
  - Icon: Calendar grid with album art in cells
  - Copy: "Browse your listening history. Every day is a song."

Feature 3: "Friend Reactions"
  - Icon: Overlapping profile pictures with heart emoji
  - Copy: "See what your friends are listening to. React with your vibe."
\`\`\`

**Footer**:
- Links: Privacy, Terms, Support (Body Small, text-tertiary)
- Background: bg-deep
- Padding: 24px

---

### 2. Feed Page (Primary Social View)

**Layout Philosophy**: BeReal-style full-screen posts with minimal UI chrome

**Header** (Sticky, glassmorphism):
\`\`\`
- Position: fixed top-0
- Height: 64px
- Background: bg-surface with backdrop-blur(20px)
- Border-bottom: 1px solid rgba(255,255,255,0.05)
- Content:
  - Left: "Replay" logo (Display size, 800 weight)
  - Center: Empty (focus on content)
  - Right: Notification bell icon (24px) + Profile picture (40x40px, rounded-full)
- Shadow: shadow-subtle on scroll
\`\`\`

**Post Card** (Full-width, immersive):
\`\`\`
Container:
- Width: 100% (max 640px centered on desktop)
- Margin: 16px vertical spacing between posts
- Background: bg-elevated
- Border-radius: radius-xl (28px)
- Padding: 0 (full bleed album art)
- Shadow: shadow-medium
- Hover: shadow-large with 4px translateY(-4px)

Post Header:
- Padding: 16px horizontal, 12px vertical
- Background: bg-surface (sits above album art)
- Layout: Flex row
  - Left: Profile picture (44x44px, rounded-full, border 2px solid bg-deep)
  - Center:
    - Username (Body Large, 600 weight)
    - Timestamp (Caption size, text-tertiary, "2h ago" format)
  - Right: Three-dot menu (text-secondary)

Album Art Section:
- Aspect-ratio: 1:1 (square)
- Width: 100%
- Position: relative
- Image: High-res album art (640x640px)
- Overlay (on hover): rgba(0,0,0,0.3) with "View Details" text
- Border-radius: 0 (full bleed)

Reaction Ring (BeReal-style):
- Position: absolute, bottom-right of album art
- Reactions: Profile picture bubbles (32x32px) with emoji overlay (16x16px)
- Layout: Arc/circular positioning at 45% radius
- Max visible: 3 reactions + "+5 more" pill
- Border: 2px solid bg-deep (creates separation)
- Hover: Individual bubbles scale 1.15
- Animation: Pop-in stagger (100ms delay each)

Song Metadata Bar:
- Padding: 16px
- Background: Linear gradient from album-vibrant (20% opacity) → transparent
- Layout: Flex column
  - Song Name: Body Large (600 weight, text-primary)
  - Artist Name: Body (text-secondary)
  - Stats Row: Caption size (text-tertiary)
    - Play icon + play count (e.g., "127 plays")
    - Dot separator
    - Clock icon + duration (e.g., "3:42")
    - Dot separator
    - Calendar icon + date (e.g., "Nov 18")

Action Bar:
- Padding: 12px 16px
- Background: bg-surface
- Border-top: 1px solid rgba(255,255,255,0.05)
- Layout: Flex row, space-between
- Buttons (icon + label):
  1. React: Heart icon (outlined) + "React"
     - Active state: Filled heart, accent-green
  2. Comment: Chat bubble icon + count (e.g., "12")
  3. Add to Queue: Plus icon + "Queue"
  4. Share: Share arrow icon
- Style: Ghost buttons, 40px height, radius-full
- Hover: bg-highlight
- Active: Scale 0.95
\`\`\`

**Empty State** (No posts):
\`\`\`
- Center vertically in viewport
- Icon: Music note with question mark (96x96px, text-tertiary)
- Heading: "No posts yet" (Display size, text-secondary)
- Body: "Add friends to see their music" (Body size, text-tertiary)
- CTA: "Invite Friends" button (accent-gradient, radius-full)
\`\`\`

**Infinite Scroll**:
- Trigger: 400px from bottom
- Loader: Spinning Spotify logo (48x48px) with "Loading..." text (Body Small)
- Animation: Fade-in posts (300ms ease-out)

---

### 3. Daily Reveal Modal (9:30pm Experience)

**Philosophy**: This is THE money moment. Make it feel like opening a surprise package.

**Modal Overlay**:
\`\`\`
- Position: fixed, full viewport
- Background: rgba(0,0,0,0.95) (near-black)
- Z-index: 9999
- Backdrop-filter: blur(40px)
- Animation: Fade-in 600ms ease-out
\`\`\`

**Reveal Sequence** (Timed animations):
\`\`\`
Step 1 - Countdown (0-2s):
- Center: "3... 2... 1..." (Hero size, 900 weight)
- Color: reveal-yellow
- Scale animation: Pulse from 0.8 to 1.2
- Sound effect: Optional tick sound

Step 2 - Album Art Reveal (2-4s):
- Album art: Scale from 0 → 1 (spring animation, bounce effect)
- Size: 400x400px (mobile), 600x600px (desktop)
- Border-radius: radius-lg
- Shadow: shadow-glow with album-vibrant color
- Confetti: 100 particles in album-vibrant colors
  - Duration: 5 seconds
  - Gravity: 0.3
  - Spread: Full viewport

Step 3 - Content Slide-In (4-5s):
- Slide up from bottom (translateY(100px) → 0)
- Opacity: 0 → 1
- Easing: ease-out

Content Layout:
- Song Name: Display size, 800 weight, text-center, margin-bottom: 8px
- Artist Name: Body Large, text-secondary, text-center, margin-bottom: 24px
- Stats Row (Flex row, justify-center, gap: 24px):
  - Stat Card (bg-elevated, padding: 16px, radius-md):
    - Value: Display size (e.g., "47")
    - Label: Caption (e.g., "PLAYS TODAY")
  - Stat Card:
    - Value: Display size (e.g., "2h 14m")
    - Label: Caption (e.g., "LISTENING TIME")
  - Stat Card:
    - Value: Display size (e.g., "#2")
    - Label: Caption (e.g., "TOP SONG")

Action Buttons (margin-top: 32px):
- Primary: "Share to Feed" (accent-gradient, full width, 56px height)
- Secondary: "Add to Queue" (outline button, text-secondary)
- Tertiary: "Close" (ghost button, text-tertiary)
\`\`\`

**Close Behavior**:
- Tap outside modal → Dismiss
- Swipe down gesture on mobile → Dismiss with slide-out animation
- X button (top-right) → Immediate dismiss

---

### 4. Calendar Page (Music Archive)

**Layout**: Month view grid with album art thumbnails

**Header**:
\`\`\`
- Background: bg-surface
- Padding: 24px
- Border-bottom: 1px solid rgba(255,255,255,0.05)

Month Navigation:
- Layout: Flex row, space-between, align-center
- Left: Previous month button (ChevronLeft icon, ghost button)
- Center: Month/Year (Display size, "November 2024")
- Right: Next month button (ChevronRight icon, disabled if future)
- Current month: accent-green dot below

Stats Cards Row (4 cards, equal width):
- bg-elevated, padding: 16px, radius-md
- Layout: Icon (24px, accent-green) + Value (Display size) + Label (Caption)
- Cards:
  1. Days tracked (e.g., "127 days")
  2. Total plays (e.g., "3,429")
  3. Hours listened (e.g., "142h")
  4. Unique artists (e.g., "89")
\`\`\`

**Calendar Grid**:
\`\`\`
- Grid: 7 columns (S M T W T F S)
- Gap: 8px
- Padding: 24px
- Background: bg-deep

Day Cell:
- Aspect-ratio: 1:1
- Border-radius: radius-md
- Position: relative

Day Header (First row):
- Text: Caption size, text-tertiary, text-center
- Padding: 8px
- Background: none

Day Cell (With Song):
- Background: Album art (100% cover, blur background if needed)
- Overlay: Linear gradient (transparent → rgba(0,0,0,0.7))
- Content (bottom-left corner):
  - Day number: Body Small, 600 weight
- Border: 2px solid transparent
- Hover: Border → accent-green, scale 1.05
- Active (today): Border → reveal-yellow, shadow-glow

Day Cell (Empty):
- Background: bg-elevated
- Content: Day number (text-tertiary, center)
- Border: 1px dashed rgba(255,255,255,0.1)

Day Cell (Future):
- Background: bg-surface
- Content: Day number (text-tertiary, opacity 0.3)
- Cursor: not-allowed
- Disabled state
\`\`\`

**Day Detail Modal** (Click any day):
\`\`\`
- Modal: Bottom sheet on mobile, centered on desktop
- Background: bg-elevated with glassmorphism
- Border-radius: radius-xl (top only on mobile)
- Padding: 24px
- Max-height: 80vh
- Overflow: Auto scroll

Content:
- Album Art: 200x200px, radius-lg, shadow-medium
- Song Name: Display size, 800 weight
- Artist Name: Body Large, text-secondary
- Date: Caption, text-tertiary
- Stats Grid (2 columns):
  - Total Plays, First Play Time, Last Play Time, Listening Duration
  - Each: bg-surface, padding: 12px, radius-md
- Action Buttons:
  - "Play on Spotify" (accent-gradient, external link)
  - "Share Day" (outline button)
  - "Close" (ghost button)
\`\`\`

---

### 5. Profile Page (User Profiles)

**Header Section** (Hero with gradient background):
\`\`\`
- Height: 400px (mobile), 500px (desktop)
- Background: album-gradient from top 3 recent songs (animated, slow pan)
- Overlay: Linear gradient (transparent → bg-deep)
- Content (bottom-left, padding: 24px):

  Profile Picture:
  - Size: 120x120px (mobile), 160x160px (desktop)
  - Border: 4px solid bg-deep
  - Border-radius: full
  - Shadow: shadow-large
  - Position: Relative, translateY(50%) (overlaps into content)

  Username:
  - Display size, 900 weight
  - Color: text-primary
  - Margin-top: 16px

  Bio:
  - Body size, text-secondary
  - Max-width: 400px
  - Margin-top: 8px

  Action Buttons (Flex row, gap: 12px, margin-top: 16px):
  - If own profile: "Edit Profile" (outline button)
  - If friend: "Remove Friend" (destructive outline)
  - If not friend: "Add Friend" (accent-gradient)
  - Always: "Share Profile" (ghost button, share icon)
\`\`\`

**Stats Section** (Own profile only):
\`\`\`
- Background: bg-surface
- Padding: 24px
- Border-top: 1px solid rgba(255,255,255,0.05)

Section Header:
- "Your Music Stats" (Display size, 800 weight)
- Time Range Selector: Tabs (4 weeks, 6 months, All time)
  - Active tab: accent-green underline (3px thick)

Top Tracks Row:
- Horizontal scroll container
- Gap: 16px
- Each track card:
  - Width: 160px
  - bg-elevated, padding: 12px, radius-md
  - Album art: 136x136px, radius-sm
  - Song name: Body Small, 600 weight, truncate
  - Artist: Caption, text-secondary, truncate
  - Plays: Caption, text-tertiary (e.g., "47 plays")

Top Artists Row:
- Same styling as tracks
- Circular artist images (136x136px)
- Artist name + play count

Top Genres Row:
- Pill-style badges
- bg-elevated, padding: 8px 16px, radius-full
- Genre name + percentage (e.g., "Indie Rock • 34%")
- Color: Gradient from genre-specific color
\`\`\`

**Recent Songs Grid**:
\`\`\`
- Grid: 3 columns (mobile), 6 columns (desktop)
- Gap: 12px
- Padding: 24px

Song Cell:
- Aspect-ratio: 1:1
- Album art: 100% cover
- Border-radius: radius-md
- Overlay (on hover):
  - rgba(0,0,0,0.5)
  - Play icon (48x48px, center)
  - Scale 1.05
- Date badge (top-right):
  - bg-deep with 80% opacity
  - Caption size
  - Padding: 4px 8px
  - radius-full
\`\`\`

**Private Profile State** (Not friends, private account):
\`\`\`
- Replace stats/songs with lock screen
- Icon: Lock icon (96x96px, text-tertiary)
- Heading: "This profile is private" (Display size)
- Body: "Add [username] as a friend to see their music" (Body size, text-secondary)
- CTA: "Send Friend Request" (accent-gradient)
\`\`\`

---

### 6. Settings Page

**Layout**: Form-style with sections

**Page Header**:
\`\`\`
- "Settings" (Display size, 800 weight)
- Subtitle: "Manage your Replay experience" (Body, text-secondary)
\`\`\`

**Section: Account**:
\`\`\`
Form Fields (Vertical stack, gap: 16px):
- Username Input:
  - Label: Body Small, 600 weight
  - Input: bg-elevated, 48px height, radius-md, padding: 12px 16px
  - Border: 1px solid rgba(255,255,255,0.1)
  - Focus: Border → accent-green (2px)

- Bio Textarea:
  - Same styling as input
  - Height: 120px
  - Character count: Caption, text-tertiary (150/150)

- Privacy Toggle:
  - Label: "Private Profile" (Body, 600 weight)
  - Description: "Only friends can see your music" (Body Small, text-secondary)
  - Switch: accent-green when active, radius-full

- Save Button:
  - accent-gradient, full-width, 48px height
  - Disabled state: opacity 0.5, cursor not-allowed
\`\`\`

**Section: Notifications**:
\`\`\`
Toggle List (Each item: flex row, space-between):
- Daily Reveals: Switch
- Friend Requests: Switch
- New Reactions: Switch
- Weekly Recaps: Switch

Reveal Time Picker:
- Label: "Daily reveal time"
- Input: Time selector (default 9:30 PM)
- Style: bg-elevated, radius-md
\`\`\`

**Section: Danger Zone**:
\`\`\`
- Background: rgba(239, 68, 68, 0.1) (red tint)
- Border: 1px solid rgba(239, 68, 68, 0.3)
- Radius: radius-md
- Padding: 24px

- Heading: "Danger Zone" (Body Large, 700 weight, #EF4444)
- Action: "Delete Account" button
  - Style: Destructive (red background, white text)
  - Click: Shows confirmation modal
\`\`\`

**Confirmation Modal**:
\`\`\`
- Title: "Are you absolutely sure?" (Display size, text-center)
- Body: Warning text (Body size, text-secondary)
- Buttons:
  - "Cancel" (outline button, full-width)
  - "Yes, delete my account" (destructive, full-width)
- Animation: Scale-in (300ms ease-out)
\`\`\`

---

## Navigation Components

### Bottom Navigation (Mobile Only, <768px)

**Design Philosophy**: BeReal-style minimal tab bar

\`\`\`
Container:
- Position: fixed, bottom: 0
- Width: 100%
- Height: 72px (includes safe-area padding)
- Background: bg-surface with glassmorphism
  - backdrop-filter: blur(20px) saturate(180%)
- Border-top: 1px solid rgba(255,255,255,0.05)
- Shadow: shadow-large (upward)
- Safe-area-inset: Padding bottom for notched devices
- Z-index: 100

Tab Items (3 total, evenly spaced):
1. Feed - Home icon
2. Calendar - Calendar icon
3. Profile - Profile picture (32x32px, rounded-full)

Tab Styling:
- Flex column, align-center
- Gap: 4px
- Icon size: 24x24px
- Label: Caption size (only on active tab)
- Color: text-tertiary (inactive), text-primary (active)
- Active indicator:
  - Icon: accent-green fill
  - Label: Fade-in (200ms)
  - Background: Subtle glow (bg-highlight, radius-full)
- Touch target: 48x48px minimum
- Animation: Spring scale on tap (0.95 → 1.05 → 1)
\`\`\`

### Sidebar Navigation (Desktop Only, ≥768px)

**Design Philosophy**: Spotify-style persistent sidebar

\`\`\`
Container:
- Position: fixed, left: 0
- Width: 240px
- Height: 100vh
- Background: bg-surface
- Border-right: 1px solid rgba(255,255,255,0.05)
- Padding: 24px 16px

Logo Section (Top):
- "Replay" logo (Display size, 900 weight)
- Icon: Music note with circular arrows (32x32px, accent-green)
- Margin-bottom: 32px

Nav Items (Vertical stack, gap: 8px):
- Feed, Calendar, Profile, Settings
- Each item:
  - Padding: 12px 16px
  - Border-radius: radius-md
  - Flex row, gap: 12px
  - Icon (24x24px) + Label (Body, 600 weight)
  - Inactive: text-secondary
  - Hover: bg-highlight
  - Active:
    - Background: accent-green with 20% opacity
    - Text: accent-green
    - Border-left: 3px solid accent-green
- Transition: All 200ms ease

Logout Button (Bottom):
- Position: absolute, bottom: 24px
- Style: Destructive outline button
- Full width of sidebar (minus padding)
- Icon: LogOut (16px)
\`\`\`

---

## Shared Components

### Reaction System (BeReal-Inspired)

**Reaction Ring** (Around album art):
\`\`\`
Container:
- Position: absolute
- Width: 100% of parent (album art)
- Height: 100%
- Pointer-events: none (except bubbles)

Reaction Bubbles:
- Size: 36x36px
- Border-radius: full
- Border: 3px solid bg-deep (creates separation)
- Shadow: shadow-medium
- Position: Calculated in circle at 45% radius
- Max visible: 12 (then "+N more" pill)
- Layout: Even distribution around circle (30deg intervals)
- Animation: Pop-in with spring (overshoot)
  - Scale: 0 → 1.1 → 1
  - Duration: 400ms
  - Stagger: 80ms delay per bubble

Bubble Content:
- Profile picture: 100% fill, rounded-full
- Emoji overlay (bottom-right):
  - Size: 18x18px
  - Background: bg-deep, rounded-full
  - Border: 2px solid bg-deep
  - Position: absolute, bottom: -2px, right: -2px

"+N More" Pill:
- Size: 36px height, auto width
- Background: bg-elevated
- Border: 2px solid bg-deep
- Border-radius: full
- Padding: 0 12px
- Text: Caption size, 700 weight
- Position: Last in circle sequence
\`\`\`

**Reaction Picker Popover**:
\`\`\`
Trigger: "React" button in action bar

Popover:
- Position: Above trigger, centered
- Background: bg-elevated with glassmorphism
- Border-radius: radius-lg
- Padding: 12px
- Shadow: shadow-large

Emoji Grid:
- 4 columns × 2 rows (8 emojis total)
- Gap: 8px
- Emojis: 🔥 ❤️ 💀 😭 🎯 👀 🤔 😍
- Each button:
  - Size: 48x48px
  - Border-radius: radius-md
  - Emoji: 28px font-size
  - Background: transparent
  - Hover: bg-highlight, scale 1.1
  - Active (already reacted): bg-highlight, accent-green border (2px)
  - Tap: Spring animation (scale 0.9 → 1.15 → 1)

Animation:
- Enter: Scale from 0.9 + fade-in (200ms ease-out)
- Exit: Scale to 0.95 + fade-out (150ms ease-in)
\`\`\`

### Album Art Component (Reusable)

**Philosophy**: Album art is sacred - treat it like Spotify does

\`\`\`
Size Variants:
- sm: 48x48px (inline references, comments)
- md: 120x120px (list items)
- lg: 200x200px (modal details)
- xl: 400x400px (reveal modal)
- hero: 100% width, aspect-square (feed posts)

Styling:
- Border-radius: radius-lg (20px) for all sizes
- Shadow: shadow-medium (increases to shadow-large on hover)
- Image: object-fit: cover, high-quality (no blur)
- Loading state:
  - Skeleton gradient animation (bg-surface → bg-highlight → bg-surface)
  - Duration: 1.5s infinite
- Error state:
  - Placeholder: Music note icon (text-tertiary)
  - Background: bg-elevated

Interactive States:
- Hover:
  - Scale: 1.02
  - Shadow: shadow-glow with album-vibrant
  - Overlay: rgba(0,0,0,0.2) with play icon
- Click:
  - Spring animation (scale 0.98 → 1.02 → 1)
  - Opens Spotify player or detail modal

Gradient Extraction (for backgrounds):
- Use Vibrant.js or similar library
- Extract 3 colors: dominant, vibrant, muted
- Create linear-gradient: dominant (top-left) → vibrant (center) → muted (bottom-right)
- Apply to parent containers with 20-40% opacity overlay
\`\`\`

### Profile Picture Component

\`\`\`
Sizes:
- xs: 24x24px (reaction bubbles)
- sm: 32x32px (navigation, inline mentions)
- md: 44x44px (post headers, comments)
- lg: 80x80px (profile previews)
- xl: 160x160px (profile hero)

Styling:
- Border-radius: full (perfect circle)
- Border: 2px solid bg-deep (creates separation when overlapping)
- Shadow: none (default), shadow-medium (on hover/hero)
- Image: object-fit: cover

Loading State:
- Skeleton: circular gradient pulse
- Color: bg-highlight

Fallback (No Image):
- Background: Linear gradient (accent-green → accent-gradient)
- Initial: First letter of username (Display size, 900 weight, white)
- Center: Flex center alignment

Online Indicator (Optional):
- Position: absolute, bottom-right
- Size: 25% of avatar size
- Background: accent-green
- Border: 2px solid bg-deep
- Border-radius: full
- Animation: Pulse (1.5s infinite)
\`\`\`

### Button System (Spotify-Inspired)

\`\`\`
Primary (CTA):
- Background: accent-gradient
- Color: text-primary (white)
- Height: 48px (default), 56px (hero)
- Padding: 0 32px
- Border-radius: radius-full
- Font: Body, 700 weight
- Shadow: shadow-subtle
- Hover:
  - Scale: 1.03
  - Shadow: shadow-glow
  - Gradient shift (animate background-position)
- Active: Scale 0.97
- Disabled: Opacity 0.5, cursor not-allowed

Secondary (Outline):
- Background: transparent
- Border: 2px solid text-secondary
- Color: text-secondary
- Height: 48px
- Padding: 0 24px
- Border-radius: radius-full
- Hover:
  - Border-color: text-primary
  - Color: text-primary
  - Background: bg-highlight

Ghost (Subtle):
- Background: transparent
- Color: text-secondary
- Height: 40px
- Padding: 0 16px
- Border-radius: radius-md
- Hover:
  - Background: bg-highlight
  - Color: text-primary

Icon Button:
- Size: 40x40px square
- Background: transparent
- Color: text-secondary
- Border-radius: radius-md
- Hover:
  - Background: bg-highlight
  - Color: text-primary
  - Scale: 1.05

Destructive:
- Background: #EF4444 (red)
- Same as primary otherwise
- Hover: Darken 10%

Loading State (All variants):
- Disabled: true
- Opacity: 0.7
- Icon: Spinning circle (16px) replaces text
- Animation: Rotate 360deg, 1s linear infinite
\`\`\`

### Toast Notifications (Sonner-Inspired)

\`\`\`
Container:
- Position: fixed, bottom: 24px (mobile: bottom: 88px to clear nav)
- Right: 24px (mobile: center horizontally)
- Max-width: 400px
- Z-index: 9999

Toast Card:
- Background: bg-elevated with glassmorphism
- Border: 1px solid rgba(255,255,255,0.1)
- Border-radius: radius-lg
- Padding: 16px
- Shadow: shadow-large
- Min-height: 64px

Layout:
- Flex row, gap: 12px
- Icon (left): 24x24px
  - Success: Checkmark (accent-green)
  - Error: X circle (#EF4444)
  - Info: Info circle (text-secondary)
- Content (flex-1):
  - Title: Body, 600 weight
  - Description: Body Small, text-secondary
- Close button (right): X icon (16px), ghost style

Animation:
- Enter: Slide-in from right + fade-in (300ms ease-out)
- Exit: Slide-out to right + fade-out (200ms ease-in)
- Progress bar (optional):
  - Height: 3px
  - Background: accent-green
  - Width: 100% → 0% over duration (e.g., 5s)
  - Position: absolute, bottom: 0

Stacking:
- Multiple toasts: Stack vertically with 8px gap
- Max visible: 3 (older ones fade out)
\`\`\`

---

## Animations & Micro-interactions

### Page Transitions (Framer Motion)

\`\`\`
Route Changes:
- Exit: Fade-out + translateY(-20px), 200ms
- Enter: Fade-in + translateY(20px → 0), 300ms, delay 100ms
- Easing: ease-out

Modal Overlays:
- Backdrop: Fade-in opacity 0 → 1, 200ms
- Content:
  - Scale: 0.95 → 1
  - Opacity: 0 → 1
  - Duration: 300ms
  - Easing: spring (damping: 25, stiffness: 300)

Bottom Sheets (Mobile):
- Enter: translateY(100%) → 0%, 400ms ease-out
- Drag interaction: Follow finger with resistance
- Release:
  - If dragged >30%: Dismiss (continue slide down)
  - If <30%: Snap back (spring animation)
\`\`\`

### Micro-interactions

\`\`\`
Like/React Button:
- Idle: Icon outline, text-secondary
- Hover: Scale 1.05, text-primary
- Tap:
  1. Scale 0.9 (100ms)
  2. Fill icon with accent-green (200ms)
  3. Particles burst (8 small circles, 400ms, fade-out)
  4. Scale 1.1 → 1 (spring)
- Undo: Reverse fill to outline

Play Button (on album art):
- Hover:
  - Album scales 1.02
  - Overlay fades in (rgba(0,0,0,0.3))
  - Play icon fades in + scales from 0.8 → 1
- Tap:
  - Icon rotates 180deg + scales 1.2 → 0 (400ms)
  - Ripple effect from center (accent-green, 600ms)

Scrolling Effects:
- Header: Blur increases on scroll (backdrop-filter: 0px → 20px)
- Cards: Parallax scroll (background moves slower than foreground)
- Navbar: Shadow opacity increases 0 → 1 after 50px scroll

Loading States:
- Skeleton screens:
  - Gradient shimmer left → right (1.5s infinite)
  - Colors: bg-surface → bg-highlight → bg-surface
- Spinners:
  - Spotify-style pulsing circle (scale 0.8 ↔ 1.2, 1s infinite)
  - Color: accent-green

Pull-to-Refresh (Mobile):
- Pull down on feed:
  - Rubber band resistance effect
  - Icon appears at top (arrow down → circular arrows)
  - Release: Rotate icon + show spinner
  - On complete: Fade out spinner, content slides in
\`\`\`

### Success Celebrations

\`\`\`
Daily Reveal Unlock:
- Confetti: 150 particles
  - Colors: album-vibrant, accent-green, reveal-yellow
  - Gravity: 0.4
  - Spread: 80deg cone
  - Duration: 5s
- Album art:
  - Scale 0 → 1.2 → 1 (spring overshoot)
  - Rotate -10deg → 10deg → 0 (wiggle)
  - Shadow pulse: shadow-medium → shadow-glow → shadow-medium
- Sound: Optional upbeat chime

Friend Request Accepted:
- Toast: Green checkmark with bounce animation
- Profile picture: Scale 1 → 1.15 → 1 (spring)
- Badge: "+1 Friend" floats up with fade-out

Song Added to Queue:
- Album art: translateX(0 → 300px) + scale(1 → 0.5) + fade-out
- Music note icon: Flies to queue icon in navbar
- Queue icon: Pulse + badge count increments
\`\`\`

---

## Responsive Design Breakpoints

\`\`\`
Mobile: < 768px
- Bottom navigation (visible)
- Sidebar navigation (hidden)
- Feed posts: Full width (16px side margins)
- Calendar: 7-column grid (tight spacing)
- Typography: Reduce hero size by 30%
- Modals: Bottom sheet style (slide up from bottom)
- Spacing: Reduce by 25% across the board

Tablet: 768px - 1024px
- Sidebar navigation (visible, 200px width)
- Bottom navigation (hidden)
- Feed posts: Max-width 600px, centered
- Calendar: Same 7-column grid (more breathing room)
- Typography: Full scale
- Modals: Centered with max-width 500px

Desktop: > 1024px
- Sidebar navigation (visible, 240px width)
- Feed posts: Max-width 640px, centered
- Calendar: 7-column grid (generous spacing)
- Modals: Centered with max-width 600px
- Multi-column stats (3-4 columns)
- Hover states enabled (disable on touch devices)

Ultra-wide: > 1440px
- Max content width: 1280px (centered)
- Sidebar: 280px width
- Feed: Two-column layout option (optional enhancement)
\`\`\`

---

## Accessibility Requirements

\`\`\`
Color Contrast:
- All text: WCAG AAA (7:1 ratio) for body, AA (4.5:1) for large text
- Interactive elements: 3:1 minimum against backgrounds
- Focus indicators: 3px solid accent-green with 2px offset

Keyboard Navigation:
- Tab order: Logical, follows visual flow
- Focus visible: Distinct outline (3px solid accent-green)
- Skip links: "Skip to main content" at top (visible on focus)
- Arrow keys: Navigate in calendar grid
- Escape key: Close modals and popovers
- Enter/Space: Activate buttons and links

Screen Readers:
- Semantic HTML: <header>, <nav>, <main>, <article>, <aside>
- ARIA labels: All icon buttons (e.g., aria-label="Add reaction")
- ARIA live regions: Feed updates, toast notifications
- Alt text: All album art (e.g., "Album cover for {song} by {artist}")
- Landmark roles: navigation, main, complementary

Motion Preferences:
- Detect: prefers-reduced-motion media query
- If enabled:
  - Disable all animations (transitions instant)
  - No confetti or particle effects
  - No parallax scrolling
  - No auto-playing content

Touch Targets:
- Minimum: 48x48px (WCAG 2.5.5)
- Spacing: 8px between interactive elements
- Mobile: Increase to 56x56px for primary actions
\`\`\`

---

## Performance Optimizations

\`\`\`
Images:
- Format: WebP with JPEG fallback
- Lazy loading: All below-fold images
- Priority: Above-fold album art only
- Sizes: Responsive srcset (640w, 1280w, 1920w)
- Blur placeholder: Low-res base64 inline
- CDN: Spotify image CDN (cached, optimized)

Code Splitting:
- Route-based: Each page as separate chunk
- Heavy components: Lazy load modals, settings
- Vendor chunks: Separate React, Framer Motion

Caching Strategy:
- API responses: 5-minute stale-while-revalidate
- Album art: Cache-first with 7-day expiry
- Static assets: Immutable cache (versioned URLs)
- Service worker: Offline shell for PWA

Bundle Size:
- Target: <200KB initial JS (gzipped)
- Tree-shaking: Remove unused Radix components
- Font subsetting: Only characters used in UI

Rendering:
- React Server Components: Static content
- Streaming: Progressive page rendering
- Virtualization: Calendar grid for >90 days
- Infinite scroll: Render 10 posts at a time
\`\`\`

---

## Dark Mode & Theme Switching

**Default**: Dark mode (primary experience)

**Light Mode** (Optional toggle in settings):
\`\`\`
Automatic Adjustments:
- Background: Invert (black → white)
- Foreground: Invert (white → near-black #1a1a1a)
- Shadows: Reduce opacity by 50%, add subtle borders
- Album gradients: Reduce saturation by 20%, increase brightness 10%
- Accent-green: Keep consistent (Spotify brand)
- Glassmorphism: Change to subtle shadow-based depth

Theme Toggle:
- Location: Settings page
- Style: Sun/Moon icon toggle (ghost button)
- Transition: All colors 300ms ease-out (smooth)
- Persistence: localStorage + user preference API
\`\`\`

---

## Edge Cases & Error States

\`\`\`
No Internet:
- Hero: "You're offline" message
- Icon: Wifi-off (96px, text-tertiary)
- Body: "Reconnect to see your music" (text-secondary)
- CTA: "Retry" button (accent-gradient)
- Cached: Show last loaded feed with "Offline" badge

API Error:
- Toast: Red error notification
- Retry: Automatic retry 3 times with exponential backoff
- Fallback: "Something went wrong" message with "Try again" button

Empty States:
- No friends: "Add friends to see posts" + "Invite" CTA
- No posts: "Nothing to see yet" + suggestion to add friends
- No history: "Start listening to see your calendar" + Spotify link
- Private profile: Lock icon + "This profile is private"

Loading States:
- Initial page load: Full-page skeleton (3 post skeletons)
- Infinite scroll: Spinner at bottom + "Loading more..."
- Image loading: Blurred placeholder → sharp image (fade-in)
- Button actions: Disable + spinner inside button

Spotify Disconnected:
- Alert: Yellow warning banner at top
- Message: "Reconnect to Spotify to keep tracking"
- CTA: "Reconnect" button (accent-gradient)
- Icon: Alert triangle (24px)

Rate Limited:
- Toast: "Slow down! Try again in a moment"
- Disable: Interactive elements temporarily
- Cooldown: Visual timer (countdown seconds)
\`\`\`

---

## Implementation Notes for v0

**Tech Stack to Use**:
- Next.js 14+ with App Router
- TypeScript (strict mode)
- Tailwind CSS v4 (use @theme for design tokens)
- shadcn/ui components (install as needed)
- Framer Motion for animations
- Radix UI for accessible primitives
- Lucide React for icons

**File Structure**:
\`\`\`
/app
  /layout.tsx (root with providers)
  /page.tsx (landing)
  /(app)/layout.tsx (authenticated shell)
  /(app)/feed/page.tsx
  /(app)/calendar/page.tsx
  /(app)/profile/[username]/page.tsx
  /(app)/settings/page.tsx

/components
  /ui (shadcn primitives)
  /layout (nav components)
  /feed (post card, reveal modal)
  /shared (album art, profile pic, reactions)

/lib
  /utils.ts (cn function, helpers)
  /constants.ts (colors, breakpoints)
\`\`\`

**Key Deliverables**:
1. Complete design system in Tailwind config
2. Reusable component library (album art, profile pics, buttons)
3. All 6 pages (landing, feed, calendar, profile, settings, reveal)
4. Navigation components (bottom nav + sidebar)
5. Reaction system (bubbles + picker)
6. Responsive layouts (mobile-first)
7. Animations & transitions (Framer Motion)
8. Accessibility (ARIA, keyboard nav)

**Design Priorities**:
1. **Album art is hero**: Always largest, most prominent element
2. **Minimalism**: Remove chrome, focus on content (BeReal DNA)
3. **Bold typography**: Don't be shy with large text
4. **Depth through shadows**: Layering, not flat design
5. **Green accent**: Spotify's #1DB954 is signature color
6. **Spring animations**: Bouncy, playful (not stiff corporate)
7. **Glassmorphism**: Blur and transparency for modern feel
8. **Reaction-first**: Make social interaction effortless and fun

---

## Final Notes

This design merges **BeReal's authentic, spontaneous social experience** with **Spotify's immersive, music-first aesthetic**. The result should feel like:

- Opening BeReal to see friends' daily moments → Opening Replay to see friends' daily songs
- Spotify's album art driving the entire visual experience → Every color, gradient, and mood from the music
- Time-sensitive reveals create FOMO and daily engagement
- Reactions are effortless, visual, and fun (profile pic bubbles > text comments)
- The app gets out of the way and lets music be the star

**Core Philosophy**: Music is emotional, social, and personal. The UI should amplify those feelings, not distract from them. Every pixel should serve the music.

---

**End of Prompt**

Generate a complete, production-ready UI implementation of Replay following these exact specifications. Prioritize visual fidelity to Spotify's design language while maintaining BeReal's social interaction patterns.

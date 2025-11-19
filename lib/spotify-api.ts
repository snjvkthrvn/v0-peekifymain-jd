interface SpotifyPlayback {
  device: {
    id: string
    is_active: boolean
    is_private_session: boolean
    is_restricted: boolean
    name: string
    type: string
    volume_percent: number
  }
  shuffle_state: boolean
  repeat_state: string
  timestamp: number
  context: {
    external_urls: {
      spotify: string
    }
    href: string
    type: string
    uri: string
  }
  progress_ms: number
  item: {
    album: {
      album_type: string
      artists: Array<{
        external_urls: {
          spotify: string
        }
        href: string
        id: string
        name: string
        type: string
        uri: string
      }>
      available_markets: string[]
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      images: Array<{
        height: number
        url: string
        width: number
      }>
      name: string
      release_date: string
      release_date_precision: string
      total_tracks: number
      type: string
      uri: string
    }
    artists: Array<{
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      name: string
      type: string
      uri: string
    }>
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: {
      isrc: string
    }
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
  }
  currently_playing_type: string
  actions: {
    disallows: {
      resuming: boolean
    }
  }
  is_playing: boolean
}

class SpotifyAPIClient {
  private getAccessToken(): string | null {
    // In a real app, this would come from your auth provider/session
    return localStorage.getItem('spotify_access_token')
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getAccessToken()
    if (!token) {
      throw new Error('No access token found')
    }

    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (response.status === 401) {
      // Handle token expiration
      throw new Error('Unauthorized')
    }

    if (response.status === 403) {
      throw new Error('Premium required')
    }

    if (response.status === 404) {
      throw new Error('No active device found')
    }

    if (response.status === 429) {
      throw new Error('Rate limited')
    }

    if (response.status === 204) {
      return {} as T
    }

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`)
    }

    return response.json()
  }

  async addToQueue(trackUri: string): Promise<void> {
    await this.request(`/me/player/queue?uri=${encodeURIComponent(trackUri)}`, {
      method: 'POST',
    })
  }

  async getCurrentPlayback(): Promise<SpotifyPlayback | null> {
    try {
      return await this.request<SpotifyPlayback>('/me/player')
    } catch (error) {
      return null
    }
  }

  async play(trackUri: string): Promise<void> {
    await this.request('/me/player/play', {
      method: 'PUT',
      body: JSON.stringify({ uris: [trackUri] }),
    })
  }
}

export const spotifyApi = new SpotifyAPIClient()

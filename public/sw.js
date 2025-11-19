// Service Worker for push notifications

const CACHE_NAME = 'replay-v1'
const NOTIFICATION_TAG = 'daily-reveal'

// Push event handler
self.addEventListener('push', (event) => {
  let data = { title: 'Replay', body: 'New activity on Replay', url: '/feed' }
  
  try {
    data = event.data.json()
  } catch (e) {
    console.error('Failed to parse push data', e)
  }

  const options = {
    body: data.body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: NOTIFICATION_TAG,
    data: {
      url: data.url || '/feed',
      timestamp: Date.now()
    },
    actions: [
      { action: 'view', title: 'View Now' },
      { action: 'dismiss', title: 'Later' }
    ],
    requireInteraction: true, // BeReal-style urgency
    vibrate: [200, 100, 200], // Vibration pattern
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
        // Check if there is already a window/tab open with the target URL
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i]
          if (client.url === event.notification.data.url && 'focus' in client) {
            return client.focus()
          }
        }
        // If not, open a new window/tab
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url)
        }
      })
    )
  }
})

// Install/activate events
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

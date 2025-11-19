const PUBLIC_VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY || 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'

export async function registerServiceWorker() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      return registration
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      return null
    }
  }
  return null
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false
  
  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

export async function subscribeToPushNotifications() {
  const registration = await navigator.serviceWorker.ready
  
  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    })

    // In a real app, send this subscription to your backend
    // await fetch('/api/notifications/subscribe', {
    //   method: 'POST',
    //   body: JSON.stringify(subscription),
    //   headers: { 'Content-Type': 'application/json' }
    // })

    return true
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error)
    return false
  }
}

export async function unsubscribeFromPushNotifications() {
  const registration = await navigator.serviceWorker.ready
  const subscription = await registration.pushManager.getSubscription()
  
  if (subscription) {
    await subscription.unsubscribe()
    // In a real app, notify backend to remove subscription
    return true
  }
  return false
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function showLocalNotification(title: string, body: string, icon?: string) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: icon || '/icon-192.png',
      badge: '/icon-192.png',
    })
  }
}

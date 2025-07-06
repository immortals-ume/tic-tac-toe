/* eslint-env serviceworker */
/* global clients, self */

const CACHE_CONFIG = {
  NAME: 'tic-tac-toe-v1.0.0',
  URLS: [
    '/',
    '/index.html',
    '/static/js/bundle.js',
    '/static/css/main.css',
    '/manifest.json',
    '/favicon.ico',
    '/logo192.png',
    '/logo512.png'
  ]
};

const NOTIFICATION_CONFIG = {
  ICON_PATH: '/logo192.png',
  DEFAULT_MESSAGE: 'New game available!',
  VIBRATION_PATTERN: [100, 50, 100]
};

class ServiceWorkerManager {
  static createNotificationOptions(eventData) {
    return {
      body: eventData || NOTIFICATION_CONFIG.DEFAULT_MESSAGE,
      icon: NOTIFICATION_CONFIG.ICON_PATH,
      badge: NOTIFICATION_CONFIG.ICON_PATH,
      vibrate: NOTIFICATION_CONFIG.VIBRATION_PATTERN,
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        { action: 'explore', title: 'Play Now', icon: NOTIFICATION_CONFIG.ICON_PATH },
        { action: 'close', title: 'Close', icon: NOTIFICATION_CONFIG.ICON_PATH }
      ]
    };
  }

  static async handleInstall(event) {
    const cache = await caches.open(CACHE_CONFIG.NAME);
    console.log('Opened cache');
    await cache.addAll(CACHE_CONFIG.URLS);
  }

  static async handleFetch(event) {
    try {
      const response = await caches.match(event.request);
      return response || await fetch(event.request);
    } catch {
      if (event.request.destination === 'document') {
        return caches.match('/index.html');
      }
      throw new Error('Failed to fetch');
    }
  }

  static async handleActivate(event) {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.map(cacheName =>
            cacheName !== CACHE_CONFIG.NAME ? caches.delete(cacheName) : undefined
        )
    );
  }

  static async handleSync() {
    console.log('Background sync triggered');
    return Promise.resolve();
  }

  static async handlePush(event) {
    const options = this.createNotificationOptions(event.data?.text() || null);
    await self.registration.showNotification('Tic Tac Toe', options);
  }

  static async handleNotificationClick(event) {
    event.notification.close();
    if (event.action === 'explore') {
      await clients.openWindow('/');
    }
  }
}

self.addEventListener('install', event => event.waitUntil(ServiceWorkerManager.handleInstall(event)));
self.addEventListener('fetch', event => event.respondWith(ServiceWorkerManager.handleFetch(event)));
self.addEventListener('activate', event => event.waitUntil(ServiceWorkerManager.handleActivate(event)));
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(ServiceWorkerManager.handleSync());
  }
});

self.addEventListener('push', event => event.waitUntil(ServiceWorkerManager.handlePush(event)));
self.addEventListener('notificationclick', event =>
    event.waitUntil(ServiceWorkerManager.handleNotificationClick(event))
); 
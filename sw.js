const CACHE_NAME = 'tdmh-v3';

// Cache basic assets to satisfy PWA installation requirements
const URLS_TO_CACHE = [
  './',
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
    // Clear out old caches to ensure latest data is loaded
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Only cache GET requests (Ignore POST for backend Google Scripts)
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request).catch(() => {
            // If the network fails, serve the cached version (Offline Mode)
            return caches.match(event.request).then((response) => {
                if (response) {
                    return response;
                }
                return new Response('Network error. You are offline.', {
                    status: 503,
                    statusText: 'Service Unavailable'
                });
            });
        })
    );
});

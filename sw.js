const CACHE_NAME = 'tdmh-v2';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // Claim any clients immediately so the service worker acts upon first load
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Pass-through fetch with a basic network fallback to satisfy PWA requirements
    event.respondWith(
        fetch(event.request).catch(() => {
            // Return a simple 503 response if the network fails completely
            return new Response('Network error. Offline mode is not fully configured.', {
                status: 503,
                statusText: 'Service Unavailable'
            });
        })
    );
});

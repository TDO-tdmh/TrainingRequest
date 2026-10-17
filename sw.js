// A basic service worker required for PWA installation
const CACHE_NAME = 'tdmh-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    // Pass-through fetch (no offline caching right now, just serving standard network traffic)
    event.respondWith(fetch(event.request));
});

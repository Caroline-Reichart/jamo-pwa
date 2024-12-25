const CACHE_NAME = "jamos-pizza-cache-v1";
const CACHE_ASSETS = [
    "/index.html",
    "/checkout.html",
    "/style.css",
    "/checkout.css",
    "/cart.css",
    "/checkout.js",
    "/assets/icons/icon-192x192.png",
    "/assets/icons/icon-512x512.png",
    "/assets/Pizza.png" // Hintergrundbild
];

// Install Event
self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[Service Worker] Caching app assets");
            return cache.addAll(CACHE_ASSETS);
        })
    );
});

// Activate Event
self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activating...");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("[Service Worker] Removing old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Event
self.addEventListener("fetch", (event) => {
    console.log("[Service Worker] Fetching resource:", event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

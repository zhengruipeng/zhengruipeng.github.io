addEventListener("install",e => {
    console.log("installed");
    console.log(e);
    fetch(new Request("./test.html",{mode:"no-cors"})).then(response => {
        console.log(response);
    })
})
addEventListener('fetch', event => {
    console.log("fetched");
    event.respondWith(async function() {
        // Respond from the cache if we can
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;

        // Else, use the preloaded response, if it's there
        const response = await event.preloadResponse;
        if (response) return response;

        // Else try the network.
        return fetch(event.request);
    }());
});
addEventListener('activate', event => {
    console.log("activate");

    event.waitUntil(async function() {
        if (self.registration.navigationPreload) {
            // Enable navigation preloads!
            await self.registration.navigationPreload.enable();
        }
    }());
});
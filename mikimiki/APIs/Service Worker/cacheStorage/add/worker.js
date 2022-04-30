this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('./openFile.html').then(function(cache) {
            return cache.add('./openFile.html');
        })
    );
});
let ServiceWorker2 = class extends Object {
    serviceWorkerSelf;

    CACHE_VERSION = 1.0;

    activeCB() {
        caches.open(this.CACHE_VERSION).then(async caches => {
            let response = await fetch("./1.jpg");
            await caches.put(new Request("http://localhost:63342/favicon.ico"), response);
        });
    }

    async fetchCB(ev) {
        let request = ev.request;

        ev.respondWith(
            (async _ => {
                console.log("本地搜索中");
                let cache = await caches.open(this.CACHE_VERSION);
                let response = await cache.match(request);

                if (response) {
                    return response;
                }

                console.log("在线搜索中");
                response = await fetch(request);
                let response2 = response.clone();
                await cache.put(request, response2);

                return response
            })()
        );


    }

    constructor(self) {
        super();
        this.serviceWorkerSelf = self;

        self.addEventListener("install", this.activeCB);
        self.addEventListener("active", this.activeCB);
        self.addEventListener("fetch", this.fetchCB);

    }
}
let sw = new ServiceWorker2(self);


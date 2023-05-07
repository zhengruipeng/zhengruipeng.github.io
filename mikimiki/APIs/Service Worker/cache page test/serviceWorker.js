(function () {
    const CACHE_V = "1.0";
    let activateCB = function () {
        console.log("the service worker has activated");
        caches.open(CACHE_V).then(cache => {
            fetch(new Request("./1.jpg")).then(response => {
                cache.put("http://localhost:63342/favicon.ico", response);
            });
        });
    };
    let fetchCB = function (ev) {
        let request = ev.request;
        console.log("service worker get the request " + request.url);

        ev.respondWith(caches.match(request).then(response => response || new Promise(async resolve => {
            console.log("fetching from web");
            let req2 = new Request(request.clone());
            let response = await fetch(request);
            let responseForCache = new Response(response.clone());
            console.log(response, responseForCache);

            caches.open(CACHE_V).then(cache => {
                // console.log(req2)
                cache.put(req2, responseForCache);
            })
            resolve(response);
        })));
        /*console.log("fetch in caches");
        caches.open(CACHE_V).then(cache => {
            cache.match(request).then(response => {
                if(response)ev.respondWith(response);
            });
        });
        console.log("failure, fetching resources online");

        fetch(request).then(response => {
            console.log(response);

            ev.respondWith(response);
            caches.open(CACHE_V).then(cache => {
                cache.put(request,response);
            })
        });
        caches.open(CACHE_V)
            .then(cache => {
                // cache.put()
                return cache.keys();
            })
            .then(console.log);*/
        /*  caches.open(CACHE_V).then(cache => {
              cache.match(new Request(request.clone()))
                  .then(response => {
                      ev.respondWith(response);
                      return false;
                  })
                  .catch(err => {});
          });
          console.log("failure, fetching resources online");
          ev.waitUntil(fetch(new Request(request.clone())).then(response => {
              caches.open(CACHE_V)
                  .then(cache => cache.put(new Request(request.clone()),response))
                  .then(_ => ev.respondWith(response));
              ev.respondWith(response)
          }));
          caches.open(CACHE_V)
              .then(cache => {
                  // cache.put()
                  cache.keys();
              })
              .then(console.log);*/
    }

    self.addEventListener("install", activateCB);
    self.addEventListener("activate", activateCB);
    self.addEventListener("fetch", fetchCB);
})()
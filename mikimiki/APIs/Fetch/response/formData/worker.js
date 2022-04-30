const log = console.log;
log("worker");
self.onmessage = function (e){
    log(e.message);
};
self.onopen = function (){
    log("open");
};
self.onConnected = function (){
    log("connected");
};
self.onClose = function (){
    log("close");
};
self.onerror = function (){
    log("error");
};
self.onactivate = function (){
    log("onactivate");
};
const VERSION = 1;
const CACHES = "CACHE"+VERSION;
self.onfetch = function (ev){
    log("onfetch");
    console.log(caches);
    ev.respondWith(caches.open(CACHES).then( cache => {
        console.log(cache);
        return cache.match(ev.request).then( response => {
            if(response){
                log("match",response);
                return response;
            }
            return fetch(ev.request.clone()).then(response => {
                if(response.status < 400){
                    log("fetch",response);
                    cache.put(response);
                }else{
                    log("failure",response);
                }
                return response;
            }).catch(e => {
                log("fetch error");
            })
        } ).catch(e => {
            log("match error");
        })
    }))
}
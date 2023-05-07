let postMessage = function (msg){
    // self.clients.matchAll({includeUncontrolled:true})
    //     .then(clientMatches => clientMatches[0].postMessage(msg));
    self.clients.matchAll({type:"window"})
        .then(clientMatches => clientMatches[0].postMessage(msg))
        .catch(e => {
            console.warn("a message can not be sent to the client :"+msg);
        })

}
self.oninstall = async function (){
    let cache = await caches.open("table-req");
    self.onfetch = async function (ev){
        let request = ev.request;
        let url = ev.request.url;
        let method = ev.request.method;
        postMessage("get url installed: "+url);

        if(url.indexOf("favicon.ico") !== -1){
            ev.respondWith(fetch("../public/favicon.jpg"));
            return false;
        }
        if(method.toLowerCase() === "post"){
            postMessage("processing as post method")
            ev.respondWith(fetch(ev.request));
            return false;
        }

        ev.respondWith(async function() {
            // Try to get the response from a cache.
            const cachedResponse = await caches.match(ev.request);
            // Return it if we found one.
            if (cachedResponse){
                console.log("cached:"+url);
                return cachedResponse;

            }
            console.log("not cached:"+url);

            // If we didn't find a match in the cache, use the network.
            return fetch(ev.request);
        }());
    }
};
self.onfetch = function (ev){
    let request = ev.request;
    let url = ev.request.url;
    let method = ev.request.method;
    postMessage("get url: "+url);
    if(url.indexOf("favicon.ico") !== -1){
        ev.respondWith(fetch("../public/favicon.jpg"));
        return false;
    }
    if(method.toLowerCase() === "post"){
        postMessage("processing as post method")
        ev.respondWith(fetch(ev.request));
        return false;
    }
    // console.log(123);
    ev.respondWith(fetch(request));
}

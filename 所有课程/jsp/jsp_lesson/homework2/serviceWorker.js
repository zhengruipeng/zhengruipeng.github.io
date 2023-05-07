(function (){

})();
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
        postMessage("get url: "+url);

        if(url.indexOf("favicon.ico") !== -1){
            ev.respondWith(fetch("./favicon.jpg"));
            return false;
        }
        if(method.toLowerCase() === "post"){
            postMessage("processing as post method")
            ev.respondWith(fetch(ev.request));
            return false;
        }
        if(cache.match(request)){
            ev.respondWith(cache.match(request));
        }else{
            let response = await fetch(request);
            await cache.put(request, response);
            postMessage("downloaded page "+url + " ");
            ev.respondWith(response);
        }
    }
};
self.onfetch = function (ev){
    let request = ev.request;
    let url = ev.request.url;
    let method = ev.request.method;
    postMessage("get url: "+url);
    if(url.indexOf("favicon.ico") !== -1){
        ev.respondWith(fetch("./favicon.jpg"));
        return false;
    }
    if(method.toLowerCase() === "post"){
        postMessage("processing as post method")
        ev.respondWith(fetch(ev.request));
        return false;
    }
    ev.respondWith(fetch(request));
}

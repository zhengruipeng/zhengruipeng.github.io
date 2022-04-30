(function (){
    self.onfetch = function (ev){
        let request = ev.request;
        let url = request.url;
        if(url.indexOf(".wasm") === -1){
            ev.respondWith(fetch(request));
            return false;
        }
        // request.setRequestHeader("Content-Type","application/wasm");
        ev.respondWith(fetch(request,{
            headers:new Headers().append("Content-Type","application/wasm"),
        }));
    };
    self.onactivate = function (){
        self.clients.matchAll({includeUncontrolled:true}).then(matchClient => {
            for(let client of matchClient){
                client.postMessage("foo");
            }
        });
    };
})();
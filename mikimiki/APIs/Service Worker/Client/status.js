(function (){
    const VERSION = 1.0;
    self.oninstall = function (){
        console.log("worker oninstall");
        self.skipWaiting();
    };
    self.onactivate = function (){
        console.log("worker onactivate");
    };
    self.onfetch = function (ev){
        console.log(ev.request.url);
        console.log(ev.request)
        if(ev.request.url === "http://localhost:63342/favicon.ico"){
            ev.respondWith(fetch("./1.jpg"));
            return false;
        }
        ev.respondWith(fetch(ev.request));
    }
})();
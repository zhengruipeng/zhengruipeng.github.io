(function (){
    self.onfetch = function (ev){
        if(ev.request.url.indexOf("favicon.ico")  !== -1){
            ev.respondWith(fetch("./1.jpg",{method:"GET"}));
        }
        ev.respondWith(fetch(ev.request));
    }
})()
oninstall = function (){
    console.log("service worker installed");
};
onfetch = function (ev){
    console.log("onfetch");

    console.log(ev.request.url);
    self.clients.openWindow(ev.request.url).then(res => {
        console.log(res.id);
        console.log(res.url);

    });

    ev.respondWith(fetch(ev.request.clone()).then( response => {
        console.log(JSON.stringify(response));
        return response;
    }))
    self.clients.get("http://localhost:88/usr/JavaScript/%E5%A4%A9%E9%81%93%E9%85%AC%E5%8B%A4/APIS/Service%20Worker/Client/test/window.html").then(res => {
        console.log(res);
    });
    self.clients.get("frame").then(res => {
        console.log(res);
    });
    self.clients.get("http://localhost:88/usr/JavaScript/%E5%A4%A9%E9%81%93%E9%85%AC%E5%8B%A4/APIS/Service%20Worker/Client/test/worker.js").then(res => {
        console.log(res);
    });
    self.clients.get("serviceWorker").then(res => {
        console.log(res);
    });

};

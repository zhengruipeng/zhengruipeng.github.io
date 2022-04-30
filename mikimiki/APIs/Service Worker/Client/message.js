(function (){
    const VERSION = 1.0;
    self.oninstall = function (){
        console.log("worker oninstall");
        self.skipWaiting();
    };
    self.onactivate = function (){
        console.log("worker onactivate");
    };
    self.onmessage = function (ev){
        console.log(ev);
        ev.source.postMessage("get it:" + ev.data);
    }
})()
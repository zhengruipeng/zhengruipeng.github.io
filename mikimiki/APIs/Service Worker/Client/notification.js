(function (){
    const VERSION = 1.0;
    self.registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:""});
    self.oninstall = function (){
        console.log("worker oninstall");
        self.skipWaiting();
    };
    self.onactivate = function (){
        console.log("worker onactivate");
    };
    self.onnotificationclick = function (notification){
        console.log(notification);
    };
    self.onnotificationclose = function (notification){
        console.log(notification);
    };
    self.onpush = function (ev){
        console.log(ev);
    }
})();
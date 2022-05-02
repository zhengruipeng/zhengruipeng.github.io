addEventListener("activate",function (){
    console.log("activate")
});
addEventListener("install",function (e){
    Notification.requestPermission.then( res => {
        if(res === "granted"){
            let notify = new Notification("title",{body:"body"});
            notify.onclick = function (){
                navigator.serviceWorker.controller.postMessage("msg");
            };

        }
    })

});

addEventListener("message",function (e){
    console.log(e.data);
})
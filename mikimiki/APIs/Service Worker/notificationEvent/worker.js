let granted = "";

addEventListener("message",function (e){
    if(e.data === "notify"){
        console.log(Notification.permission);
        const notify = {
            body:"notify",
            data:{url:self.location.origin + "/notificationEvent/test.html"},
        };
        registration.showNotification("title",notify);
        console.log("notify");

        console.log(navigator.serviceWorker);
    }
});
addEventListener("notificationclick",function (e){
    e.notification.close();
    console.log("clicked");
    console.log(e);
})
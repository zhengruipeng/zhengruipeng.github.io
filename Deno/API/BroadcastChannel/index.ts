/*
* 
*/
(function () {
    let channel = new BroadcastChannel("name");
    let channel2 = new BroadcastChannel("name");

    channel.postMessage("hello");
    channel.addEventListener("message", function (ev) {
        console.log(ev.data);
    })
    channel2.addEventListener("message", function (ev) {
        console.log(ev.data);
        channel2.postMessage("world");
    })
})();
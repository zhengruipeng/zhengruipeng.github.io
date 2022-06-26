let postMessage = function (msg){
    self.clients.matchAll({type:"window"})
        .then(clientMatches => clientMatches[0].postMessage(msg))
        .catch(e => {
            console.warn("a message can not be sent to the client :"+msg);
        })

}
self.onfetch = function (ev){
    postMessage(ev.request.url.indexOf("以流的形式读取图片.html"));
    if(ev.request.url.indexOf("以流的形式读取图片.html") === -1){
        ev.respondWith(fetch(ev.request));
        return false;

    };
    postMessage("正在获取：./以流的形式读取图片.html");
    ev.respondWith(fetch("./以流的形式读取图片.html")
        .then((response) => {
            const reader = response.body.getReader();
            const stream = new ReadableStream({
                start(controller) {
                    controller.enqueue("fetching...");

                    // The following function handles each data chunk
                    function push() {
                        // "done" is a Boolean and value a "Uint8Array"
                        reader.read().then(({ done, value }) => {
                            // Is there no more data to read?
                            if (done) {
                                // Tell the browser that we have finished sending data
                                controller.close();
                                return;
                            }

                            // Get the data and send it to the browser via the controller
                            controller.enqueue(value);
                            push();
                        });
                    };

                    push();
                }
            });
            return new Response(stream, { headers: { "Content-Type": "text/html" } });
        }));
}
(function (){
    const request = new Request("foo.com");
    const response = new Response("foo");
    const request2 = new Request("baz.com");
    const response2 = new Response("baz");

    caches.open("v1")
        .then(_ => caches.has("v1"))
        .then(console.log)
        .then(_ => console.log(123123))
        .then(_ => caches.delete("v1"))
        .then(_ => caches.has("v1"))
        .then(console.log);

    caches.open("v1")
        .then(cache => {
            cache.put(request,response)
                .then(_ => cache.put(request2,response2))
                .then(_ => cache.match(request))
                .then(res => res.text())
                .then(console.log)
                .then(_ => cache.match(request2))
                .then(res => res.text())
                .then(console.log)
                .then(_ => cache.keys())
                .then(keys => {
                    console.log(keys[0] === request);
                    console.log(keys[1] === request2);
                })
        })
})()
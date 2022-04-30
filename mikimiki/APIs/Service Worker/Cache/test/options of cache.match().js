(function (){
    let request = new Request("foo.com");
    let postRequest = new Request("foo.com",{method:"POST"})
    let response = new Response("foo response");
    caches.open("v1")
        .then(cache => {
            cache.put(request,response)
                .then(_ => cache.match("foo.com?bar=112",{ignoreSearch:true}))
                .then(res => res.text())
                .then(console.log)
                .then(_ => cache.match(postRequest,{ignoreMethod:true}))
                .then(res => res.text())
                .then(console.log);
           /* cache.put(postRequest,response)
                .then(_ => cache.match("bar.com",{ignoreMethod:true}))
                .then(res => res.text())
                .then(console.log);*/
        })
})();
let prefetchVersion = "prefetch1";
addEventListener("install",function (event){
    let urlToPrefetch = ["fetch1"];
    console.log(event);
    console.log("ready for prefetch document");
    event.waitUntil(
        caches.open(prefetchVersion).then(function (cache){
            let cacheArr = cache.addAll(urlToPrefetch.map(v => {
                return new Request(v,{mode:"no-cors"});
            }));
            return cacheArr;
        })
    );

});

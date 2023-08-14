/*
* 
*/
(async function () {
    const cache: Cache = await caches.open("name");

    const request: Request = new Request("http://www.bing.com", {
        method: "get"
    });
    const response: Response = await fetch(request);

    // console.log(response.url, response);
    await cache.put(response.url, response);

    const response2 = await cache.match("http://www.bing.com?a=1", {
        ignoreSearch: true,
    });
    const response3: Response = await cache.match("http://www.bing.com");

    console.log(response2, response3);


    await cache.delete("http://www.bing.com");

    const response4: Response = await cache.match("http://www.bing.com");


    console.log(response4);


})();
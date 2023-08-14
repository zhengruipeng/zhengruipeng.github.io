/*
* 
*/
(async function () {
    let cache: Cache = await caches.open("name");
    console.log(await caches.has("name"));

    await caches.delete("name");
    console.log(await caches.has("name"));


})();

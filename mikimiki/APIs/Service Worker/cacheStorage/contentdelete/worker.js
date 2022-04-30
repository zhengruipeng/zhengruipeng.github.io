
console.log("loaded worker.js")
// console.log(caches);        //CacheStorage对象
caches.open("./openFile.html").then( cache => {
            console.log("caches.open has run ")
    cache.match('./openFile.html').then( arr => {
        console.log(arr);
    });
    cache.keys('./openFile.html').then( arr => {
        console.log(arr[0]);
    });
    cache.add('./openFile.html');
    cache.match('./openFile.html').then( arr => {
        console.log(arr);
    });
    cache.keys('./openFile.html').then( arr => {
        console.log(arr[0]);
    });
    /*setTimeout(function (){
        caches.delete('./openFile.html').then(res => {
            console.log(res);
        });
    },1000);*/
    /*cache.match('./openFile.html').then( arr => {
        console.log(arr);
    });
    cache.keys('./openFile.html').then( arr => {
        console.log(arr[0]);
    });
*/
})



self.addEventListener('contentdelete', event => {
    console.log("contentdelete has fired");
    event.waitUntil(
        caches.open('./openFile.html').then(cache => {
            cache.delete(`./openFile.html`);
            cache.match('./openFile.html').then( arr => {
                console.log(arr[0]);
            });
            cache.keys('./openFile.html').then( arr => {
                console.log(arr[0]);
            });
            /*return Promise.all([
                cache.delete(`./openFile.html`),
             ]);*/
        }));
});

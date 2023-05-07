self.addEventListener('fetch', function (event) {
    console.log('[Service Worker] Fetch', event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
/*
* Service Worker 中 Background Fetch API 提供了一些事件来在后台下载资源时获取相关的信息和状态，可注册的事件包括以下几个：
* backgroundfetchsuccess：
* 当后台下载资源成功时触发该事件。
* 对应的 Event 类为 BackgroundFetchSuccessEvent，包含下载请求的 id 和相关的信息。
* backgroundfetchfail：
* 当后台下载资源失败时触发该事件。
* 对应的 Event 类为 BackgroundFetchFailEvent，包含下载请求的 id 和相关的错误信息。
* backgroundfetchabort：
* 当后台下载资源被取消时触发该事件。
* 对应的 Event 类为 BackgroundFetchAbortEvent，包含下载请求的 id 和相关的信息。
* backgroundfetchclick：
* 当用户点击了下载完成的通知时触发该事件。
* 对应的 Event 类为 BackgroundFetchClickEvent，包含下载请求的 id 和相关的信息。
* 以上就是 Background Fetch API 中可注册的事件以及它们所对应的 Event 类。
* */
// 定义缓存名称和缓存版本号
const CACHE_NAME = 'background-fetch-cache-v1';
self.addEventListener("backgroundfetchsuccess", (backgroundfetchEvent) => {
    console.log("backgroundfetchsuccess invoked")
})

self.addEventListener('backgroundfetchfail', (event) => {
    console.log("backgroundfetchfail invoked")
});
self.addEventListener('backgroundfetchclick', (event) => {
    console.log("backgroundfetchclick invoked")
});
self.addEventListener('message', async event => {
    if (event.data.type === 'register-background-fetch') {
        const {id, data} = event.data;
        await self.registration.backgroundFetch.fetch(id, data.urls, data.options);
    } else {
        console.error('Unknown message type', event.data.type);
    }
});
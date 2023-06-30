// 引入核心模块
let http = require('http')

// 创建服务器(API返回的是一个实例)
let server = http.createServer()

// 绑定端口号(3000)
server.listen(3000, () => {
    console.log(`服务器启动成功,等待客户端请求...`)
})

// 监听客户端发起的请求
server.on('request', (request, response) => {

    // 客户端请求路径
    console.log(`客户端请求路径为：${request.url}`)

    response.write(JSON.stringify(request.headers));    // 响应完成
    response.write("<br />");
    response.write(request.headers.referer?request.headers.referer:"no referer");    // 响应完成

    response.end()
});
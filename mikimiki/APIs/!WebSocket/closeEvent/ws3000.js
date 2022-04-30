var ws = require("websocket-server");
// var ws = require("ws");
var httpserver = new http.Server();
httpserver.on("request",function (req,res){
     if(req.url === "/"){
         res.writeHead(200,{"Content-type":"text/html"});
         res.write("123");
         res.end();
     }
});
var wsserver = ws.createServer({server:httpserver});
wsserver.on("connection",function (s){
    s.on("message",function (m) {
        wsserver.broadcast(m)
    })
});
wsserver.listen(3000);
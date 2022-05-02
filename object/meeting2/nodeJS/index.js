let server = require("./server");
let requestHandlers = require("./serverXHRSignalingChannel");
// let log = require("./log");
let log = console.log;
let port = process.argv[2] || 5001;

function fourohfour(info){
    let res = info.res;
    log("Request handler fourohfour was called");
    res.writeHead(404,{"Content-Type":"text/plain"});
    res.write("404 page not found");
    res.end();
}

let handle = {};
handle['/'] = fourohfour;
handle['/connect'] = requestHandlers.connect;
handle['/send'] = requestHandlers.send;
handle['/get'] = requestHandlers.get;

server.serveFilePath("static");
server.start(handle,port);
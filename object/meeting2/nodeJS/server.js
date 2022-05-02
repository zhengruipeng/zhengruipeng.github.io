let http = require('http');
let url = require('url');
let fs = require('fs');

let log = /*require('log').log || */console.log;

let serveFileDir = "";
let serveFilePath;
let contentType = function (filepath){
    let index = filepath.lastIndexOf('.');

    if(index >= 0){
        switch(filepath.substr(index+1)){
            case 'html':return ("text/html");
            case 'js':return ('application/javascript');
            case 'css':return ("text/css");
            case 'txt':return ("text/plain");
            default:return ('text/html');
        }
        return ('text/html');
    }
}
let noHandlerErr = function (pathname,res){
    log("No request handler found for "+ pathname + "\n");
    res.writeHead(404,{"Content-Type":"text/plain"});
    res.write('404 Page Not Found');
    res.end();
};
let createFilePath = function (pathname){
    let components = pathname.substr(1).split('/');
    let filtered = [],temp;
     for(let i = 0,len = components.length;i<len;i++){
         temp = components[i];

         if(temp == "..")continue;

         if(temp == "")continue;
         temp = temp.replace(/~/g,'');
         filtered.push(temp);
     }
     return (serveFilePath + "/"+ filtered.join('/'));
};
let addQuery = function (str,q){
    if(q){
        log("location search info.query " +
            JSON.stringify(q).toString() + "\n");

        return str.replace("<script></script>",
            "<script> var queryparams = "+JSON.stringify(q) +
            ";</script>");
    }else{
        return str;
    }
};
let handleCustom = function (handle,pathname,info){
    if(typeof handle[pathname] == 'function'){
        handle[pathname](info);
    }else{
        noHandlerErr(pathname,info.res);
    }
};
let serveFile = function (filepath,info){
    let res = info.res;     //启动服务器的回调函数的第二个返回值
    let query = info.query;     //路径中查询的部分
    log("Serving file " + filepath + "\n");

    fs.open(filepath,'r',function (err,fd) {
        if (err) {
            log(err.message);
            noHandlerErr(filepath,res);
            return;
        }
        let readBuffer = new Buffer(20480);
        fs.read(fd,readBuffer,0,20480,0,function (err,readBytes){
            if(err){
                log(err.message);
                fs.conse(fd);
                noHandlerErr(filepath,res);
                return ;
            }
            log("just read "+ readBytes + "bytes");
            if(readBytes > 0 ){
                res.writeHead(200,{"Content-Type":contentType(filepath)});
                res.write(addQuery(readBuffer.toString('utf8',0,/*end*/readBytes),query))
            }
            res.end();
        })
    })
};
let route = function (handle,pathname,info){
    log("About to route a request for "+pathname + "\n");
    let filepath = createFilePath(pathname);
    log("Attempting to locate "+filepath + "\n");
    fs.stat(filepath,function (err,stats){
        if(!err && stats.isFile()){
            serveFile(filepath,info);
        }else{
            handleCustom(handle,pathname,info);
        }
    });
};
let setServeFilePath = function (p){
    serveFilePath = p;
};
let start = function (handle,port){
    let onRequest = function (req,res){
        let urldata = url.parse(req.url,true);
        let pathname = urldata.pathname;
        let info = {
            res,
            "query":urldata.query,
            "postData":""
        };

        log("Request for " + pathname + " received" + "\n");
        req.setEncoding('utf8');
        req.addListener("data",function (postDataChunk){
            info.postData += postDataChunk;
            log("Recived POST data chunk '" + postDataChunk + "'.");
        });
        req.addListener("end",function (){
            route(handle,pathname,info);
        });
    };
    http.createServer(onRequest).listen(port);
    log("Server started on port " + port + "\n");

};
exports.serveFilePath = setServeFilePath;
exports.start = start;








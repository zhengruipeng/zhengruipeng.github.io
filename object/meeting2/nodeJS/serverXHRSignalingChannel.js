//let log = require("log").log;
let log = console.log;

let connections = {};
let partner = {};
let messagesFor = {};

let webrtcResponse = function (response,res){
    log("replying with webrtc response "+JSON.stringify(response));
    res.writeHead(200,{"Content-Type":"application/json"});
    res.write(JSON.stringify(response));
    res.end();
};
let webrtcError = function (err,res){
    log("replying with webrtc error: "+err);
    webrtcResponse({"erro":err},res);
};


//所有传入参数均为server.js中的info对象
/*
*    let info = {
*             res,      //createServer()函数回调函数第二个参数
*             "query":urldata.query,
*             "postData":""
*         };
* */
function connect(info){
    let res = info.res;
    let query = info.query;
    let thisconnection;
    let newID = function (){
        return Math.floor(Math.random()*1000000000);
    };
    let connectFirstParty = function (){
        if(thisconnection.status == "connected"){
            delete partner[thisconnection.ids[0]];
            delete partner[thisconnection.ids[1]];
            delete messagesFor[thisconnection.ids[0]];
            delete messagesFor[thisconnection.ids[1]];
        }

        connections[query.key] = {};        //所有连接
        thisconnection = connections[query.key];        //当前连接的一个引用
        thisconnection.status = "waiting";      //设置当前状态
        thisconnection.ids = [newID()];     //创建id
        webrtcResponse({"id":thisconnection.ids[0],
        status:thisconnection.status},res);

    };
    let connectSecondParty = function (){
        thisconnection.ids[1] = newID();
        partner[thisconnection.ids[0]] = thisconnection.ids[1];
        partner[thisconnection.ids[1]] = thisconnection.ids[0];
        messagesFor[thisconnection.ids[0]] = [];
        messagesFor[thisconnection.ids[1]] = [];
        thisconnection.status = "connected";
        webrtcResponse({"id":thisconnection.ids[1],"status":thisconnection.status},res);

    };

    log("Request handler 'connect' was called");
    if(query && query.key){
        thisconnection = connections[query.key] ||
            {status:"new"};

        if(thisconnection.status == "waiting"){
            connectSecondParty();
            return false;
        }else{
            connectFirstParty();
            return false;
        }
    }else{
        webrtcError("No recognizable query key",res);
    }
}
function sendMessage(info){
    log("postData received is ***"+ info.postData + "***");
    let postData = JSON.parse(info.postData);
    let res = info.res;
    if(typeof postData ===  "undefineds"){
        webrtcError("No posted data in JSON format!",res);
        return false;
    }
    if(typeof (postData.message) === "undefined"){
        webrtcError("No message received",res);
        return false;
    }
    if(typeof (postData.id) === "undefined"){
        webrtcError("No id reveived width message",res);
        return false;
    }
    if(typeof (partner[postData.id]) === "undefined"){
        webrtcError("Invalid id " + postData.id,res);
        return false;
    }
    if(typeof (messagesFor[partner[postData.id]]) === "undefined"){
        webrtcError("Invalid id "+ postData.id,res);
        return false;
    }

    messagesFor[partner[postData.id]].push(postData.message);
    log("Saving message ***" + postData.message+
    "*** for delivery to id " + partner[postData.id]);
    webrtcResponse("Saving message *** " + postData.message +
        "*** for delivery to id" + partner[postData.id],res);


}
function getMessages(info){
    let postData = JSON.parse(info.postData);
    let res = info.res;

    if(typeof postData === "undefined"){
        webrtcError("No posted data in JSON format!",res);
        return false;
    }
    if(typeof (postData.id) === "undefined"){
        webrtcError("No id reveived on get",res);
        return false;
    }
    if(typeof (messagesFor[postData.id]) === "undefined"){
        webrtcError("Invalid id "+postData.id,res);
        return false;
    }

    log("Sending messages *** "+JSON.stringify(messagesFor[postData.id])+
        "*** to id " + postData.id);
    webrtcResponse({'msgs':messagesFor[postData.id]},res);

    messagesFor[postData.id] = [];
};

exports.connect = connect;
exports.send = sendMessage;
exports.get = getMessages;
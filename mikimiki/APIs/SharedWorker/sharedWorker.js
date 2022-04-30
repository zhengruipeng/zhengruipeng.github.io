(function (){
    let portNum = 0;
    console.log(123123);
    self.onconnect = function (e){
        /*for(let name in e){
            console.log(`${name}-----${e[name]}`)
        }*/
        const ports = e.ports;
        ports[ports.length-1].addEventListener("message",function (e){
            console.log(e.data);
        })
        ports[ports.length-1].start();
        for(let port of ports){
            port.postMessage(`port ${++portNum} has been connected`);
        }
    }
})();

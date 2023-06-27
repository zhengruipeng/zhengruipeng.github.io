(function (){
    self.onmessage = function (ev){
        console.log(ev.data);
        this.postMessage("I see,Im worker");
    }
})();
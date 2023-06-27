(function (){
    let defaultSpace = 0
    Object.defineProperty(Object.prototype,"toString2",
        {
            enumerable:false,
            configurable:false,
            writable:false,
            value: function (splitter = ",",len = -1,space = "",loopNum = 0){
                if(loopNum === 0){
                    defaultSpace = space;
                }
                let res = "";
                let counter = 0;

                if(splitter === undefined || splitter === null)splitter = "";

                for(let name in this){
                    if(typeof this[name] === "object" && this[name]?.toString2!==undefined){
                       /* res += space.repeat(loopNum);

                        res +=  "{" + splitter;*/
                        res += space.repeat(loopNum);
                        res += name+":"+"{" + splitter;
                        res += this[name]?.toString2(splitter,len,space,loopNum+1);
                        res += space.repeat(loopNum);
                        res += "},"+splitter;
                    }
                    else{
                        res += space.repeat(loopNum);
                        res+= name+":"+this[name]+","+splitter ;
                    }

                    counter++;
                    if(counter === len){
                        res += "...";
                        break;
                    }
                }
                return res;
            }
        });
})();


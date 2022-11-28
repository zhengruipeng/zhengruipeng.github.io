Object.defineProperty(Object.prototype,"toString2",
    {
        enumerable:false,
        configurable:false,
        writable:false,
        value: function (splitter = ",",len = -1){
            let res = "";
            let counter = 0;

            if(splitter === undefined || splitter === null)splitter = "";

            for(let name in this){
                res+= name+":"+this[name]+splitter ;
                counter++;
                if(counter === len){
                    res += "...";
                    break;
                }
            }
            return res;
        }
    });

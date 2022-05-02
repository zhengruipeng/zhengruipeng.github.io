let printf = function(s){
    let error = function (s,e){
        println(s+"   "+e.name+" :   "+e.message);
        log(s+"   "+e.name +"    "+e.message);
    };
    try{
        if(typeof s === "object" && arguments.length === 1) {
            if(s instanceof HTMLElement)document.body.appendChild(s);
            else document.body.innerHTML+=s;
        }/*else if(typeof s === "boolean"){
            let regexp = /%\w/;
            let i=0;
            let res = s;
            try{
                while(res.indexOf("%")!==-1){
                    if(arguments[i+1]){
                        res = res.replace(regexp,arguments[++i]);
                    }else{
                        let err = new RangeError("Not enough arguments");
                        error("arguments",err);
                        return ;
                    }
                }
            }catch(e){
                let err = new TypeError("argument one is not a String");
                error("arguments :",err);
                return ;
            }
            document.body.innerHTML += res;
        }*/
        else {
            let regexp = /%\w/;
            let i=0;
            let res = s;
            try{
                while(res.indexOf("%")!==-1){
                    if(arguments[i+1]){
                        if(typeof arguments[i+1] === "boolean"){
                            arguments[i+1] = arguments[i+1].toString();
                        }
                        res = res.replace(regexp,arguments[++i]);
                    }else{
                        let err = new RangeError("Not enough arguments");
                        error("arguments",err);
                        return ;
                    }
                }
            }catch(e){
                let err = new TypeError("argument one is not a String");
                error("arguments :",err);
                return ;
            }
            document.body.innerHTML += res;
        }
    }catch(e){
        error("printf",e);
    }
};
let println = function(s){
    document.body.appendChild(document.createTextNode(s));
    document.body.appendChild(document.createElement("br"));
};
let log = function (s){
    console.log(s);
};
let ele = function (e){
    if(e.substr(0,1) === "#"){
        return document.querySelector(e);
    }else{
        return document.querySelectorAll(e);
    }
};
let instantiation = function (F){
      let f = new F();
      Object.assign(f,F.prototype);
      return f;

};



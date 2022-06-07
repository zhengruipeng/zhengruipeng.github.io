(function (){
    class A{
        a:number = 1;
        b:number = 2;
        c:number = 3;
    }
    class B{
        a:number = 3;
        b:number = 4;
    }
    let o = <A&B>{
        a:1,
        c:3
    };
    for(let name in o){
        // console.log(name+":"+o[name]);
        console.log(name);
    }
})();

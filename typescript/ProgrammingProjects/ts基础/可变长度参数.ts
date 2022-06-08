(function (){
    let f = function  (a:string,b:number,...args:any[]){
        console.log(a);
        console.log(b+"");
        console.log(args);
    };
    f("123",33,1,2,3);
})()
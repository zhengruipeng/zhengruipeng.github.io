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
    let o = <A>{
        a:1,
        b:2,
        c:3
    };
    let o2 = <B>{
        a:4,
        b:5
    };
    let o3 = <A&B>{...o,...o2};
    console.log(o3.a);
    console.log(o3.b);
    console.log(o3.c);

})();
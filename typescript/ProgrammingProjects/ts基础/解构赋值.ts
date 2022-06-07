(function (){
    let o = {
        a:1,
        b:2,
        c:3
    };
    var {a,b} = o;
    var {a,...bc} = o;
    console.log(bc);

    let arr = [1,2,3,4,5,6,7];
    let [ele0,ele1,...eles] = arr;
    console.log(ele0);
    console.log(ele1);
    console.log(eles);

})()
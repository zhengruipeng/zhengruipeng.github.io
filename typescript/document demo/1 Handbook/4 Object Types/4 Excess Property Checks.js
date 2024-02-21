function createSquare(config) {
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20,
    };
}
//let mySquare = createSquare({ colour: "red", width: 100 });
//上述错误第一种解决方法，使用类型断言
let mySquare = createSquare({ width: 100, opacity: 0.5 });
//第三种方法，二次赋值，因为ts会对变量做较少的检查
let squareOptions = { colour: "red", width: 100 };
let mySquare2 = createSquare(squareOptions);

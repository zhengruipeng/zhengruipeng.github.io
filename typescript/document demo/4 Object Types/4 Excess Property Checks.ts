interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20,
    };
}

//let mySquare = createSquare({ colour: "red", width: 100 });
//上述错误第一种解决方法，使用类型断言
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
//第二种方法，使用索引值签名
interface SquareConfig2 {
    color?: string;
    width?: number;
    [propName: string]: any;
}
//第三种方法，二次赋值，因为ts会对变量做较少的检查
let squareOptions = { colour: "red", width: 100 };
let mySquare2 = createSquare(squareOptions);
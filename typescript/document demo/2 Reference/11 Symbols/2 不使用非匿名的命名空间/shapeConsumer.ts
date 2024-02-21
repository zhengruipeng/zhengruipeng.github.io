import * as shapes from "./shapes";

// 在使用了全部导出之后会生成一个新对象shapes，
// shapes中包含了命名空间Shapes类
let t = new shapes.Shapes.Triangle(); // shapes.Shapes?
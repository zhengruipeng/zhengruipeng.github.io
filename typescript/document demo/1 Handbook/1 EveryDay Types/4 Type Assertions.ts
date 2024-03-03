const _myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
/*
*
* 有时您会获得 TypeScript 无法了解的值类型信息。
* 例如，如果您使用document.getElementById，
* TypeScript 只知道这将返回某种HTMLElement，
* 但您可能知道您的页面将始终具有给定ID的HTMLCanvasElement 。
* 在这种情况下，您可以使用类型断言来指定更具体的类型
* 与以下代码等价
* */

const _myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");
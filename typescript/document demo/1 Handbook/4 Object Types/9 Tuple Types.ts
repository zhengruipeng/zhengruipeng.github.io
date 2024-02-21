//可选元组
type Either2dOr3d = [number, number, number?];

function setCoordinate(coord: Either2dOr3d) {
    const [x, y, z] = coord;
    
    console.log(`Provided coordinates had ${coord.length} dimensions`);
}

//可伸缩元祖
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

//用途
function readButtonInput(...args: [string, number, ...boolean[]]) {
    const [name, version, ...input] = args;
    // ...
}
//此代码与以下代码等价
//function readButtonInput(name: string, version: number, ...input: boolean[]) {
//    // ...
//}
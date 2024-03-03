function setCoordinate(coord) {
    const [x, y, z] = coord;
    console.log(`Provided coordinates had ${coord.length} dimensions`);
}
//用途
function readButtonInput(...args) {
    const [name, version, ...input] = args;
    // ...
}
//此代码与以下代码等价
//function readButtonInput(name: string, version: number, ...input: boolean[]) {
//    // ...
//}

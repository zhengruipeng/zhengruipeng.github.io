class Params {
    x;
    y;
    z;
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        // No body necessary
    }
}
const a = new Params(1, 2, 3);
console.log(a.x);
// Error
// console.log(a.z);

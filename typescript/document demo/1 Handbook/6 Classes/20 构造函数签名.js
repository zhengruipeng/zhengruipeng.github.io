class Point {
    createdAt;
    x;
    y;
    constructor(x, y) {
        this.createdAt = Date.now();
        this.x = x;
        this.y = y;
    }
}
function moveRight(point) {
    point.x += 5;
}
const point = new Point(3, 4);
moveRight(point);
point.x; // => 8

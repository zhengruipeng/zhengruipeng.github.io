class Point {
    createdAt: number;
    x: number;
    y: number
    constructor(x: number, y: number) {
        this.createdAt = Date.now()
        this.x = x;
        this.y = y;
    }
}

type a = typeof Point;
type PointInstance = InstanceType<typeof Point>

function moveRight(point: Point) {
    point.x += 5;
}

const point = new Point(3, 4);
moveRight(point);
point.x; // => 8

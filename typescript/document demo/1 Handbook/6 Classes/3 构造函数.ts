//类构造函数与函数非常相似。您可以添加带有类型注释、默认值和重载的参数：
class Point2 {
    x: number;
    y: number;

    // Normal signature with defaults
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
class Point3 {
    // Overloads
    constructor(x: number, y: string);
    constructor(s: string);
    constructor(xs: any, y?: any) {
        // TBD
    }
}

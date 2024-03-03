//和构造函数有所不同，可以在参数里写类型了
class Point {
    x = 10;
    y = 10;
    scale(n) {
        this.x *= n;
        this.y *= n;
    }
}

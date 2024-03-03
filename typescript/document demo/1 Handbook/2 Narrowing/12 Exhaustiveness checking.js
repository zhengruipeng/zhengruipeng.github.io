function getArea(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        case "triangle":
            let p = 3 / 2 * shape.sideLength;
            return Math.sqrt(p * ((p - shape.sideLength) ** 3));
        default:
            const _exhaustiveCheck = shape;
            return _exhaustiveCheck;
    }
}

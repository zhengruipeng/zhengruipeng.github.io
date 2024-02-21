//枚举成员也会变成类型！例如，我们可以说某些成员只能具有枚举成员的值：
var ShapeKind;
(function (ShapeKind) {
    ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
    ShapeKind[ShapeKind["Square"] = 1] = "Square";
})(ShapeKind || (ShapeKind = {}));
let c = {
    kind: ShapeKind.Square,
    radius: 100,
};

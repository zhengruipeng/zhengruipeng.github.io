var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "reflect-metadata";
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x},${this.y})`;
    }
}
class Line {
    set start(value) {
        this._start = value;
    }
    get start() {
        return this._start;
    }
    set end(value) {
        this._end = value;
    }
    get end() {
        return this._end;
    }
}
__decorate([
    validate,
    Reflect.metadata("design:type", Point),
    __metadata("design:type", Point),
    __metadata("design:paramtypes", [Point])
], Line.prototype, "start", null);
__decorate([
    validate,
    Reflect.metadata("design:type", Point),
    __metadata("design:type", Point),
    __metadata("design:paramtypes", [Point])
], Line.prototype, "end", null);
function validate(target, propertyKey, descriptor) {
    let set = descriptor.set;
    descriptor.set = function (value) {
        let type = Reflect.getMetadata("design:type", target, propertyKey);
        if (!(value instanceof type)) {
            throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}.`);
        }
        console.log("元数据：", type);
        console.log("设置的数据为：", value);
        set.call(this, value);
    };
}
const line = new Line();
line.start = new Point(0, 0);
line.end = new Point(1, 1); // No error now!

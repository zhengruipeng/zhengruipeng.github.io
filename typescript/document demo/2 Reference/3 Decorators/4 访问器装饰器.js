"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function configurable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.configurable = value;
    };
}
class Point {
    constructor(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
    }
}
__decorate([
    configurable(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Point.prototype, "x", null);
__decorate([
    configurable(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Point.prototype, "y", null);
__decorate([
    configurable(true),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Point.prototype, "z", null);

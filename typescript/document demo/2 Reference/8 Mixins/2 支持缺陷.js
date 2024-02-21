var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 对修饰器缺少支持
// A decorator function which replicates the mixin pattern:
const Pausable = (target) => {
    return class Pausable extends target {
        shouldFreeze = false;
    };
};
let Player = class Player {
    x = 0;
    y = 0;
};
Player = __decorate([
    Pausable
], Player);
// The Player class does not have the decorator's type merged:
const player = new Player();
const playerTwo = new Player();
playerTwo.shouldFreeze;
// 对静态属性缺少支持
function base() {
    class Base {
        static prop;
    }
    return Base;
}
function derived() {
    class Derived extends base() {
        static anotherProp;
    }
    return Derived;
}
class Spec extends derived() {
}
Spec.prop; // string
Spec.anotherProp; // string

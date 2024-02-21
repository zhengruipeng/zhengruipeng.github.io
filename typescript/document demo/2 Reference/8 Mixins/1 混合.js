/* 混合即为在不改动一个类的基础上往上面加上一组功能
* */
class Sprite {
    name = "";
    x = 0;
    y = 0;
    constructor(name) {
        this.name = name;
    }
}
// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:
function Scale(Base) {
    return class Scaling extends Base {
        // Mixins may not declare private/protected properties
        // however, you can use ES2020 private fields
        _scale = 1;
        setScale(scale) {
            this._scale = scale;
        }
        get scale() {
            return this._scale;
        }
    };
}
// Compose a new class from the Sprite class,
// with the Mixin Scale applier:
const EightBitSprite = Scale(Sprite);
const flappySprite = new EightBitSprite("Bird");
flappySprite.setScale(0.8);
console.log(flappySprite.scale);

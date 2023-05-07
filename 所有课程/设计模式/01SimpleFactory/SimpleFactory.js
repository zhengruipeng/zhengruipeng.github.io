import {config} from "./config.js";
import {ShapeTypeEnum} from "./ShapeTypeEnum.js";
import {UnsupportedShapeException} from "./UnsupportedShapeException.js";
import {Circle} from "./Circle.js";
import {Triangle} from "./Triangle.js";
import {Rectangle} from "./Rectangle.js";

let simpleFactory = function () {
    let res = null;
    switch (config.type) {
        case ShapeTypeEnum.CIRCLE:
            res = new Circle()
            break;

        case ShapeTypeEnum.RECTANGLE:
            res = new Rectangle()
            break;

        case ShapeTypeEnum.TRIANGLE:
            res = new Triangle()
            break;

        default:
            let error = new UnsupportedShapeException("并没有与给出类型相称的类");
            error.render();
            break;
    }

    return res;
};

export {simpleFactory}
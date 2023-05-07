import {Shape} from "./Shape.js";

let Rectangle = class extends Shape {
    draw() {
        console.log("Rectangle drawing");
    }

    erase() {
        console.log("Rectangle erasing");
    }
}

export {Rectangle}
import {Shape} from "./Shape.js";

let Circle = class extends Shape {
    draw() {
        console.log("Circle drawing");
    }

    erase() {
        console.log("Circle erasing");
    }
}

export {Circle}
import {Shape} from "./Shape.js";

let Triangle = class extends Shape {
    draw() {
        console.log("Triangle drawing");
    }

    erase() {
        console.log("Triangle erasing");
    }
}

export {Triangle}
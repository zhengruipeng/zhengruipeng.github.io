import {simpleFactory} from "./SimpleFactory.js";
//main function
let useCase1 = function () {
    let shape = simpleFactory();
    shape.draw();
    shape.erase();
};

useCase1();

export {useCase1}
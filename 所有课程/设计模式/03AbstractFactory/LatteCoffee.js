import {Coffee} from "./Coffee.js";

let LatteCoffee = class extends Coffee {
    getName() {
        return "LatteCoffee";
    }
}

export {LatteCoffee}
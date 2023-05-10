import {Coffee} from "./Coffee.js";

let AmericanCoffee = class extends Coffee {
    getName() {
        return "AmericanCoffee";
    }
}

export {AmericanCoffee}
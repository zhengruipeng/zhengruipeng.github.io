import {config} from "./config.js";
import {AmericanDessertFactory} from "./AmericanDessertFactory.js";

//main function
(function main() {
    let factory = new config.factory();

    let coffee = factory.createCoffee();
    let dessert = factory.createDessert();

    console.log(factory instanceof AmericanDessertFactory ? "目前是美式的工厂" : "目前是意式的工厂");
    console.log(coffee.getName());
    console.log(dessert.getName());
})();

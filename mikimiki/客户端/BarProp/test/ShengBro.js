import {Bro} from "./Bro.js";

let HuBro = class extends Bro{
    speak() {
        super.speak();
        console.log("狗儿剩");
    }
}
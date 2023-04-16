import {Bro} from "./Bro.js";

let HuBro = class extends Bro{
    speak() {
        super.speak();
        console.log("我们学生会就是为学生服务的");
    }
}
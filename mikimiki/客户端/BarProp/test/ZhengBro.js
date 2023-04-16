import {Bro} from "./Bro.js";
import {ZhengBroEmoji} from "./ZhengBroEmoji.js";

let HuBro = class extends Bro {
    emoji = ZhengBroEmoji.累挺;

    speak() {
        super.speak();
        console.log("诶呀~~~~~哼~~~~呀~~~~~~");
    }
}
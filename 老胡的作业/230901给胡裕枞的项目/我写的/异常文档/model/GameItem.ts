import {Exception} from "../exception/Exception.js";
import {Warning} from "../warning/Warning.js";

class GameItem extends Object {
    public name: string;
    public error: Exception | Warning;

    constructor(name: string, error: Exception | Warning) {
        super();
        this.name = name;
        this.error = error;
    }
}

export {GameItem}
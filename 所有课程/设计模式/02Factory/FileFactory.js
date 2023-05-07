import {Factory} from "./Factory.js";
import {FileLogger} from "./FileLogger.js";

let FileFactory = class extends Factory {
    createLogger() {
        this.logger = new FileLogger();
        return this.logger;
    };

    writeLog(/*String|Object*/ msg) {
        if (!this.logger) this.createLogger();

        return this.logger.writeLog(msg)
    };

};

export {FileFactory};
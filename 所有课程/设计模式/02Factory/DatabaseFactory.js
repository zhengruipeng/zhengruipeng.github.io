import {Factory} from "./Factory.js";
import {DatabaseLogger} from "./DatabaseLogger.js";

let DatabaseFactory = class extends Factory {
    createLogger(){
        this.logger = new DatabaseLogger();
        return this.logger;
    };
    writeLog(/*String|Object*/ msg){
        if(!this.logger)this.createLogger();

        return this.logger.writeLog(msg)
    };
};

export {DatabaseFactory};
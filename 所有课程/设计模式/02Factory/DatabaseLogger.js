import {Logger} from "./Logger.js";

let DatabaseLogger = class extends Logger {
    writeLog(/*string|Object*/ msg) {
        if (typeof msg === 'string') {
            return "Database Logger: " + msg;
        } else if (typeof msg === "object") {
            return "Database Logger: " + JSON.stringify(msg);
        }
    };
};

export {DatabaseLogger};
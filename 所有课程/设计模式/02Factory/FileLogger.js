import {Logger} from "./Logger.js";

let FileLogger = class extends Logger {
    writeLog(/*string|Object*/ msg) {
        if (typeof msg === 'string') {
            return "FileLogger Logger: " + msg;
        } else if (typeof msg === "object") {
            return "FileLogger Logger: " + JSON.stringify(msg);
        }
    };

};

export {FileLogger};
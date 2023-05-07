import {config} from "./config.js";

//main function
(function main() {
    let factory = new config.factory();
    let logger = factory.createLogger();

    console.log(logger.writeLog("hello world"));
    console.log(logger.writeLog({
        type: "object",
        message: "msg",
        message2: {
            a: 1, b: 3
        },
    }));

    console.log(factory.writeLog("hello factory"));
})();

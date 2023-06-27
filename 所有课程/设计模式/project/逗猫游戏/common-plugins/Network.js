import {Config} from "./config.js";

let Network = class extends Object{
    static offline = true;
    static async isOffline(){
        let response = await fetch(Config.service.TEST.path);
        let status = response.status;
        Network.offline = status !== 200;
        return Network.offline;
    };
}

export {Network}
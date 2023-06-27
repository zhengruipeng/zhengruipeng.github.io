import {DBUtilModel} from "./DBUtilModel.js";
import {UserModel} from "./UserModel";

class DBUtil implements DBUtilModel {
    getConnection(): DBUtilModel {
        return this;
    };

    selectUsers(): Array<UserModel> {
        return [
            {username: "admin", password: "123456"},
            {username: "1234", password: "1234"}
        ];
    };
}

export {DBUtil}

import {UserModel} from "./UserModel.js";

interface DBUtilModel {
    getConnection():DBUtilModel;
    selectUsers():Array<UserModel>;
}

export {DBUtilModel}
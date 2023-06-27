import {DBUtil} from "./DBUtil.js";
import {UserModel} from "./UserModel";

class UserDao {
    util: DBUtil;
    connection: DBUtil;
    userList: Array<UserModel>;

    constructor() {
        this.util = new DBUtil();
        this.connection = this.util.getConnection();
        this.userList = this.connection.selectUsers();
    }

    findUser(username: string, password: string): boolean {
        for (let i = 0; i < this.userList.length; i++) {
            let name = this.userList[i]['username'];
            let pwd = this.userList[i]['password'];
            if (username === name && password === pwd) {
                return true;
            }
        }
        return false;
    }
}

export {UserDao}
// $username = $_POST['username'];
// $password = $_POST['password'];
//
// $user = new UserDao();
// echo $user->findUser($username, $password) ? "OK" : "NO";

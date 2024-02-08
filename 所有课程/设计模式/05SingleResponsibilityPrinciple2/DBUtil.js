class DBUtil {
    getConnection() {
        return this;
    }
    ;
    selectUsers() {
        return [
            { username: "admin", password: "123456" },
            { username: "1234", password: "1234" }
        ];
    }
    ;
}
export { DBUtil };

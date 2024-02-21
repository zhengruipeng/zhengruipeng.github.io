class User {
    admin;
}
const db = getDB();
const admins = db.filterUsers(function () {
    return this.admin;
});
let o = {
    a: 1,
    foo() {
        console.log(this.a);
    }
};

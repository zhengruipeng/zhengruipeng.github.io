declare function getDB(): DB;

class User {
    public admin: boolean;
}

interface DB {
    filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
    return this.admin;
});

//demo
interface Cus {
    a: number;

    foo(): void;
}

let o = {
    a: 1,
    foo(this: Cus): void {
        console.log(this.a);
    }
}
/// <reference lib="esnext" />

// from the default lib:、
declare class Database{
    execAsync(begintransaction: string):Promise<void>;
}
declare class Account{}
declare function debitAccount(db: Database, account1: Account, amount: number);
declare function creditAccount(db: Database, account1: Account, amount: number);

interface AsyncDisposable {
    [Symbol.asyncDispose]: () => PromiseLike<void>;
}
// usage:
class DatabaseTransaction implements AsyncDisposable {
    public success = false;
    private db: Database | undefined;
    private constructor(db: Database) {
        this.db = db;
    }
    static async create(db: Database) {
        await db.execAsync("BEGIN TRANSACTION");
        return new DatabaseTransaction(db);
    }
    async [Symbol.asyncDispose]():Promise<void> {
        if (this.db) {
            const db = this.db;
            this.db = undefined;
            if (this.success) {
                await db.execAsync("COMMIT TRANSACTION");
            }
            else {
                await db.execAsync("ROLLBACK TRANSACTION");
            }
        }
    }
}


async function transfer(db: Database, account1: Account, account2: Account, amount: number) {
    await using tx = await DatabaseTransaction.create(db);
    if (await debitAccount(db, account1, amount)) {
        await creditAccount(db, account2, amount);
    }
    // if an exception is thrown before this line, the transaction will roll back
    tx.success = true;
    // now the transaction will commit
}
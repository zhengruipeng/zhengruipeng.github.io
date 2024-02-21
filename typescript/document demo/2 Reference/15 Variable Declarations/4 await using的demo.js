/// <reference lib="esnext" />
var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        function next() {
            while (env.stack.length) {
                var rec = env.stack.pop();
                try {
                    var result = rec.dispose && rec.dispose.call(rec.value);
                    if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                }
                catch (e) {
                    fail(e);
                }
            }
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
// usage:
class DatabaseTransaction {
    success = false;
    db;
    constructor(db) {
        this.db = db;
    }
    static async create(db) {
        await db.execAsync("BEGIN TRANSACTION");
        return new DatabaseTransaction(db);
    }
    async [Symbol.asyncDispose]() {
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
async function transfer(db, account1, account2, amount) {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
        const tx = __addDisposableResource(env_1, await DatabaseTransaction.create(db), true);
        if (await debitAccount(db, account1, amount)) {
            await creditAccount(db, account2, amount);
        }
        // if an exception is thrown before this line, the transaction will roll back
        tx.success = true;
    }
    catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
    }
    finally {
        const result_1 = __disposeResources(env_1);
        if (result_1)
            await result_1;
    }
}

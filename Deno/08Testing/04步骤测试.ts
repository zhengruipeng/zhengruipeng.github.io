/*
* 
*/
import {assertEquals} from "https://deno.land/std@0.194.0/testing/asserts.ts";
import {Client} from "https://deno.land/x/mysql/mod.ts";

interface User {
    id: number;
    name: string;
}

interface Book {
    id: number;
    title: string;
}

(async function () {
    let id = 1;
    Deno.test("database", async (t) => {
        const client = await new Client().connect({
            hostname: "localhost",
            username: "root",
            db: "test",
            password: "mikimiki",
        });

        // provide a step name and function
        await t.step("insert user", async () => {
            await client.query(
                "INSERT INTO users (id,name) VALUES (" + id + ",'Deno')",
            );
            const users = await client.query(
                "SELECT * FROM users",
            );
            assertEquals(users.length, 1);
            assertEquals(users[0].name, "Deno");
        });

        // or provide a test definition
        await t.step({
            name: "insert book",
            fn: async () => {
                await client.query(
                    "INSERT INTO books (id,title) VALUES (" + id + ",'The Deno Manual')",
                );
                const books = await client.query(
                    "SELECT * FROM books",
                );
                assertEquals(books.length, 1);
                assertEquals(books[0].title, "The Deno Manual");
            },
            ignore: false,
            // these default to the parent test or step's value
            sanitizeOps: true,
            sanitizeResources: true,
            sanitizeExit: true,
        });

        // nested steps are also supported
        await t.step("update and delete", async (t) => {
            await t.step("update", () => {
                // even though this test throws, the outer promise does not reject
                // and the next test step will run
                throw new Error("Fail.");
            });

            await t.step("delete", () => {
                // ...etc...
            });
        });

        const testRan = await t.step({
            name: "copy books",
            fn: () => {
                // ...etc...
            },
            ignore: true, // was ignored, so will return `false`
        });

        // steps can be run concurrently if sanitizers are disabled on sibling steps
        const testCases = [1, 2, 3];
        await Promise.all(testCases.map((testCase) =>
            t.step({
                name: `case ${testCase}`,
                fn: async () => {
                    // ...etc...
                },
                sanitizeOps: false,
                sanitizeResources: false,
                sanitizeExit: false,
            })
        ));

        client.close();
    })
    // steps return a value saying if they ran or not

})();
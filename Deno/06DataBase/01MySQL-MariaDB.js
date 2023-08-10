import { Client } from "https://deno.land/x/mysql/mod.ts";
/*
*
*/
(async function () {
    const client = await new Client().connect({
        hostname: "localhost",
        username: "root",
        db: "database",
        password: "mikimiki",
    });
    console.log(await client.query("select * from user"));
})();

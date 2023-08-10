/*
*
*/
import { load } from "https://deno.land/std/dotenv/mod.ts";
(async function () {
    const env = await load();
    console.log(env);
    const password = env["PASSWORD"];
    console.log(password);
    // "Geheimnis"
})();

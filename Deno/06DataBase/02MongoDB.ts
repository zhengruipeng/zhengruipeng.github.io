import {MongoClient
} from "https://deno.land/x/mongo@v0.31.2/src/client.ts";
/*
* 
*/
(async function () {

    const client = new MongoClient();

    // Connecting to a Local Database
    const db = await client.connect("mongodb://127.0.0.1:27017");
    console.log(db);




})();
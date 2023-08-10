/*
* 
*/
(function () {
    Deno.env.set("FIREBASE_API_KEY", "examplekey123");
    Deno.env.set("FIREBASE_AUTH_DOMAIN", "firebasedomain.com");

    console.log(Deno.env.get("FIREBASE_API_KEY")); // examplekey123
    console.log(Deno.env.get("FIREBASE_AUTH_DOMAIN")); // firebasedomain.com
    console.log(Deno.env.has("FIREBASE_AUTH_DOMAIN")); // true
    console.log(Deno.env.toObject());

    Deno.env.delete("FIREBASE_API_KEY")
    Deno.env.delete("FIREBASE_AUTH_DOMAIN")
})();
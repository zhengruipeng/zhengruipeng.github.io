/*
*
*/
(async function () {
    const decoder = new TextDecoder();
    const line = decoder.decode(await Deno.readAll(Deno.stdin));
    console.log(line);
})();

(async function (){
    const res = await fetch("https://deno.com");
    const body = await res.text();
    console.log(body);
})();
/*
* You might remember from the introduction that Deno is a runtime that is secure by default. This means you need to explicitly give programs permission to do certain ‘privileged’ actions, such as access the network.
*
* You can answer ‘y’ to the prompt, or try it out again with the correct permission flag:
*
* deno run --allow-net=deno.com first_steps.ts
* Or, using the curl script:
*
* deno run --allow-net=deno.com https://deno.land/std@0.193.0/examples/curl.ts https://deno.com
*
* */
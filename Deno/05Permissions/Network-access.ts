(async function () {
    const result: Response = await fetch("https://deno.land/");
    const text: string = await result.text();
    console.log("获取完毕：" + text.substring(0, 20));
})();
/*
* deno run --allow-net=github.com,deno.land Network-access.ts
* */
import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { Mapper } from "../../packages/Mapper.ts";
const handler = async (req) => {
    console.log(req.headers);
    const urlPattern = new URLPattern(req.url);
    const paths = urlPattern.pathname;
    let file = null;
    const mapper = new Mapper(paths, null);
    mapper.map("/crossorigin/index", async function (ev) {
        console.log("映射到了：" + ev.key);
        file = await Deno.readFile("D:\\XAMPP\\htdocs\\usr\\JavaScript\\zhengruipeng.github.io\\resources\\01. 星の海の記憶.mp3");
    });
    mapper.finally(function () {
        console.log("当前路径为：" + paths);
    });
    await mapper.callSync();
    return new Response(file, {
        status: 200,
        headers: new Headers({
            "Content-Type": "audio/mpeg",
            "Access-Control-Allow-Origin": "http://localhost:63343",
            "Access-Control-Allow-Credentials": "true"
        }),
    });
};
serve(handler);

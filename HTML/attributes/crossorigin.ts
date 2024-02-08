import {serve} from "https://deno.land/std@0.193.0/http/server.ts";
import {Mapper, MapperEvent} from "../../packages/Mapper.ts";

const handler = async (req: Request): Promise<Response> => {
    console.log(req.headers);
    const urlPattern: URLPattern = new URLPattern(req.url);
    const paths: string = urlPattern.pathname;

    let file: Uint8Array | null = null;

    const mapper: Mapper = new Mapper(paths, null);

    mapper.map("/crossorigin/index", async function (ev: MapperEvent) {
        console.log("映射到了：" + ev.key);
        file = await Deno.readFile("D:\\zhengruipeng.github.io\\resources\\01. 星の海の記憶.mp3");
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
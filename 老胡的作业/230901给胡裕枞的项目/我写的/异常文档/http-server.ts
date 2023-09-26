// deno-lint-ignore-file no-unused-vars
import {serve} from "https://deno.land/std@0.193.0/http/server.ts";

const getMimeTypeWithDir = function (dir: string): string {
    // deno-lint-ignore prefer-const
    let prefix: string = dir.substring(dir.lastIndexOf(".") + 1);
    let mimeType = "";

    switch (prefix) {
        case "html":
            mimeType = "text/html";
            break;
        case "css":
            mimeType = "text/css";
            break;
        case "js":
            mimeType = "text/javascript";
            break;
        default:
            mimeType = "text/html";
            break;
    }

    return mimeType
};

const handler = async (req: Request): Promise<Response> => {
    const urlPattern: URLPattern = new URLPattern(req.url);
    const paths: string = urlPattern.pathname;
    console.log(paths)

    const path = `${Deno.cwd()}${paths}`; // 获取请求的文件路径

    let file = null;
    try {
        file = await Deno.readFile(path);

        return new Response(file, {
            status: 200,
            headers: new Headers({
                "Content-Type": getMimeTypeWithDir(path),
            }),
        });
    } catch (error) {
        file = null;
        return new Response(file, {
            status: 404,
            headers: new Headers({
                "Content-Type": "text/html",
            }),
        });
    }
};

serve(handler, {port: 8083});


const url = "http://localhost:8083/index.html";

const command = new Deno.Command("start", {
    args: [
        url
    ],
});

console.log("你可以通过http://localhost:8083/index.html访问文档");
/*
* deno run --allow-net --allow-run --allow-read http-server.ts
* */
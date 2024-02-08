import { serve } from "https://deno.land/std/http/server.ts";

const server = serve({ port: 8000 });
console.log("Server is running on http://localhost:8000");

async function sendVideoChunks(response: any, videoPath: string) {
    const videoFile = await Deno.readFile(videoPath);
    const chunkSize = 500000; // 500K

    let bytesRead = 0;
    while (bytesRead < videoFile.statSync().size) {
        const chunk = new Uint8Array(chunkSize);
        const { nread } = await videoFile.read(chunk);
        if (nread === null) break;

        await response.write(chunk.subarray(0, nread));
        bytesRead += nread;
    }

    videoFile.close();
}

// 转换 server 对象为异步迭代器
const asyncServer = server[Symbol.asyncIterator]();

async function handleRequests() {
    for await (const request of asyncServer) {
        // 假设请求路径为 "/video"
        if (request.url === "/video") {
            const videoPath = "../../../1.mp4";

            // 设置响应头
            const headers = new Headers();
            headers.set("Content-Type", "video/mp4");
            headers.set(
                "Content-Length",
                String((await open(videoPath)).statSync().size)
            );
            headers.set("Accept-Ranges", "bytes");

            // 发送响应头
            request.respond({
                status: 200,
                headers,
            });

            // 发送视频数据
            await sendVideoChunks(request.w, videoPath);
        }
    }
}

// 调用函数处理请求
handleRequests();
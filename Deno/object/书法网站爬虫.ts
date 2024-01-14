import {DOMParser, HTMLDocument} from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
import {
    Document,
} from "https://deno.land/x/deno_dom@v0.1.38/src/dom/document.ts";


let nameCounter = 0;
let downloadDir: string | URL | null | undefined = "./董其昌行楷书作欣赏《勤政励学箴》/"
let assertDir: string = downloadDir ?? "";

const coreUrl = `http://www.yac8.com/news/17328`;
const pageNum = 13;

const urls: string[] = [];

for (let i = 1; i <= pageNum; i++) {
    urls.push(`${coreUrl}${i !== 1 ? `_${i}` : ""}.html`);
}

async function downloadImage(url: string, filename: string) {
    const response = await fetch(url);
    const imageBuffer = await response.arrayBuffer();
    // @ts-ignore
    await Deno.mkdir(assertDir, {recursive: true})
    // @ts-ignore
    await Deno.writeFile(assertDir + filename, new Uint8Array(imageBuffer));
}

async function scrapeImages(url: string) {
    const headers: Headers = new Headers();
    headers.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188")
    // headers.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7");
    // headers.append("Accept-Encoding", "gzip, deflate, br");
    // headers.append("Accept-Language", "en-US,en;q=0.9");
    // headers.append("Cache-Control", "max-age=0");
    // headers.append("Connection", "keep-alive");
    // headers.append("Cookie", "ASPSESSIONIDQWQRTBCS=GAKECIPBOFGLGEHBOCOEHDJG; ASPSESSIONIDSSVQSBDT=HGKECIPBNIEIEHHHGNGHECNC; ASPSESSIONIDQWTRSADS=DNCFCIPBGPLCOILIBAMIIFBA; ASPSESSIONIDSWSRTBCS=EKNCDIPBOHHNDGCNEGCNDDCJ; ASPSESSIONIDQWRQTACT=EBLECIPBLKKMFADPACDEDBDN; ASPSESSIONIDQSVTQACT=FCLECIPBJGNOJDGHKELJGLDH");
    // headers.append("Connection", "keep-alive");
    // headers.append("Host", "www.yac8.com");

    const response = await fetch(url, {
        headers,
        method: "get"
    });
    const arrayBuffer = await response.arrayBuffer();

    const gb2312Bytes = new Uint8Array(arrayBuffer);

    // 将GB2312字节转换为UTF-8字符串
    const decoder = new TextDecoder('gb2312');
    const html = decoder.decode(gb2312Bytes);

    console.log("爬取" + url + "完毕，解析中");

    //@ts-ignore
    const document: Document = new DOMParser().parseFromString(html, 'text/html');
    //@ts-ignore
    const imageElements: NodeList<HTMLImageElement> = document.querySelectorAll('img');
    const titleElement = document.querySelector("title");
    const h1 = document.querySelector("#mainBody h1");

    console.log(h1?.outerHTML);
    //如果下载地址为空的话就赋值
    downloadDir === null &&
    (downloadDir = "./" + titleElement?.innerText + "/",
        assertDir = downloadDir);

    console.log("找到图片" + imageElements.length + "个");

    for (const img of imageElements) {
        const src = img.getAttribute('src');

        const imageUrl = new URL(src, url).href;
        const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        await downloadImage(imageUrl, (++nameCounter) + ".jpg");
        console.log(`Downloaded: ${filename}`);
    }
}


console.log(urls);
(async function () {
    for await (const url of urls) {
        await scrapeImages(url)
            .then(() => console.log('Scraping completed.'))
            .catch((error) => console.error(`Error occurred: ${error.message}`));
    }
})();
/*
* 切记再打开此软件时必须关闭vpn
deno run --allow-net --allow-write 书法网站爬虫.ts
* */
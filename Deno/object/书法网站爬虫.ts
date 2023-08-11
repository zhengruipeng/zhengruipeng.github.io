import {DOMParser} from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
import {
    Document,
} from "https://deno.land/x/deno_dom@v0.1.38/src/dom/document.ts";

let nameCounter = 0;

async function downloadImage(url: string, filename: string) {
    const response = await fetch(url);
    const imageBuffer = await response.arrayBuffer();
    await Deno.mkdir("download", {recursive: true})
    await Deno.writeFile("./download/" + filename, new Uint8Array(imageBuffer));
}

async function scrapeImages(url: string) {
    const headers: Headers = new Headers();
    headers.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188")
    headers.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7");
    headers.append("Accept-Encoding", "gzip, deflate, br");
    headers.append("Accept-Language", "en-US,en;q=0.9");
    headers.append("Cache-Control", "max-age=0");
    headers.append("Connection", "keep-alive");
    headers.append("Cookie", "ASPSESSIONIDQWQRTBCS=GAKECIPBOFGLGEHBOCOEHDJG; ASPSESSIONIDSSVQSBDT=HGKECIPBNIEIEHHHGNGHECNC; ASPSESSIONIDQWTRSADS=DNCFCIPBGPLCOILIBAMIIFBA; ASPSESSIONIDSWSRTBCS=EKNCDIPBOHHNDGCNEGCNDDCJ; ASPSESSIONIDQWRQTACT=EBLECIPBLKKMFADPACDEDBDN; ASPSESSIONIDQSVTQACT=FCLECIPBJGNOJDGHKELJGLDH");
    headers.append("Connection", "keep-alive");
    headers.append("Host", "www.yac8.com");
    headers.append("Referer", "https://www.yac8.com/news/?list_refer-theme-%u8463%u5176%u660C.html");

    const response = await fetch(url, {
        headers,
        method: "get"
    });
    const html = await response.text();
    console.log("爬取" + url + "完毕，解析中");

    //@ts-ignore
    const document: Document = new DOMParser().parseFromString(html, 'text/html');
    //@ts-ignore
    const imageElements: NodeList<HTMLImageElement> = document.querySelectorAll('img');

    console.log("找到图片" + imageElements.length + "个");


    for (const img of imageElements) {
        const src = img.getAttribute('src');

        const imageUrl = new URL(src, url).href;
        const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        await downloadImage(imageUrl, (++nameCounter) + ".jpg");
        console.log(`Downloaded: ${filename}`);
    }
}

const urls = [
    "http://www.yac8.com/news/16024.html",
    "http://www.yac8.com/news/16024_2.html",
    "http://www.yac8.com/news/16024_3.html",
    "http://www.yac8.com/news/16024_4.html",
    "http://www.yac8.com/news/16024_5.html",
    "http://www.yac8.com/news/16024_6.html",
]

for (const url of urls) {
    scrapeImages(url)
        .then(() => console.log('Scraping completed.'))
        .catch((error) => console.error(`Error occurred: ${error.message}`));
}

/*
* deno run --allow-net --allow-write 书法网站爬虫.ts
* */
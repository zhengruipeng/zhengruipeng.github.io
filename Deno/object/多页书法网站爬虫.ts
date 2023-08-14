import {DOMParser, HTMLDocument} from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
import {
    Document,
} from "https://deno.land/x/deno_dom@v0.1.38/src/dom/document.ts";

const LOG_FILE_PATH = "./download/log.txt"; // 日志文件路径

function logOperation(msg: string): void {
    console.log(msg)
    // @ts-ignore
    Deno.writeTextFileSync(LOG_FILE_PATH, `${msg}\n`, {append: true});
}

function errorOperation(msg: string): void {
    console.warn(msg)
    // @ts-ignore
    Deno.writeTextFileSync(LOG_FILE_PATH, `error: ${msg}\n`, {append: true});
}

class ArtPage extends Object {
    public baseUrl: string = "http://www.yac8.com/news/";
    public pageNum: number = 0;
    public urls: string[] = [];
    public nameCounter: number = 0;
    public downloadDir = "./download/";

    async downloadImage(url: string, filename: string) {
        const response = await fetch(url);
        const imageBuffer = await response.arrayBuffer();
        // @ts-ignore
        await Deno.mkdir(this.downloadDir, {recursive: true})
        // @ts-ignore
        await Deno.writeFile(this.downloadDir + filename, new Uint8Array(imageBuffer));
    }

    public setHttpHeader(): Headers {
        const headers: Headers = new Headers();
        headers.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188")
        headers.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*!/!*;q=0.8,application/signed-exchange;v=b3;q=0.7");
        headers.append("Accept-Encoding", "gzip, deflate, br");
        headers.append("Accept-Language", "en-US,en;q=0.9");
        headers.append("Cache-Control", "max-age=0");
        headers.append("Connection", "keep-alive");
        headers.append("Cookie", "ASPSESSIONIDQWQRTBCS=GAKECIPBOFGLGEHBOCOEHDJG; ASPSESSIONIDSSVQSBDT=HGKECIPBNIEIEHHHGNGHECNC; ASPSESSIONIDQWTRSADS=DNCFCIPBGPLCOILIBAMIIFBA; ASPSESSIONIDSWSRTBCS=EKNCDIPBOHHNDGCNEGCNDDCJ; ASPSESSIONIDQWRQTACT=EBLECIPBLKKMFADPACDEDBDN; ASPSESSIONIDQSVTQACT=FCLECIPBJGNOJDGHKELJGLDH");
        headers.append("Connection", "keep-alive");
        headers.append("Host", "www.yac8.com");
        headers.append("Referer", "https://www.yac8.com/news/?list_refer-theme-%u8463%u5176%u660C.html");

        return headers;
    }

    // public async scrapeTest(url: string) {
    //     logOperation(url)
    // }

    public async scrapeImages(url: string, pageNum: number) {
        const headers = this.setHttpHeader();

        const response = await fetch(url, {
            headers,
            method: "get"
        });
        const arrayBuffer = await response.arrayBuffer();

        const gb2312Bytes = new Uint8Array(arrayBuffer);

        // 将GB2312字节转换为UTF-8字符串
        const decoder = new TextDecoder('gb2312');
        const html = decoder.decode(gb2312Bytes);

        logOperation("爬取" + url + "完毕，解析中");

        //@ts-ignore
        const document: Document = new DOMParser().parseFromString(html, 'text/html');
        //@ts-ignore
        const imageElements: NodeList<HTMLImageElement> = document.querySelectorAll('img');
        const titleElement = document.querySelector("title");
        const h1 = document.querySelector("#mainBody h1");

        // console.log(titleElement.innerHTML)
        let title = h1.innerHTML.match(/^([^\(]+)(?:\(\d+\))?/)[1];

        //如果下载地址为空的话就赋值
        this.downloadDir = `./download/${title}/`;

        logOperation(`${"-".repeat(10)}${title}第${pageNum}页${"-".repeat(10)}`);
        logOperation("找到图片" + imageElements.length + "个");

        for (const img of imageElements) {
            const src = img.getAttribute('src');

            const imageUrl = new URL(src, url).href;
            const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            await this.downloadImage(imageUrl, (++this.nameCounter) + ".jpg");
            logOperation(`下载了：${filename}`);
        }
    }

    public async getPageNum(): Promise<number> {
        const headers: Headers = this.setHttpHeader();

        const response: Response = await fetch(this.baseUrl + ".html", {
            headers,
            method: "get"
        });
        const html = await response.text();
        //@ts-ignore
        const document: Document = new DOMParser().parseFromString(html, 'text/html');
        const divs: Element[] = Array.from(document.querySelectorAll("table.pageNavBox td div"));

        this.pageNum = divs.length - 2 > 0 ? divs.length - 2 : 1;

        return this.pageNum;
    }

    public initUrls(): string[] {
        for (let i = 1; i <= this.pageNum; i++) {
            this.urls.push(`${this.baseUrl}${i !== 1 ? `_${i}` : ""}.html`);
        }
        return this.urls;
    }

    constructor(url) {
        super();
        this.baseUrl += `${url}`;
    }
}

class SearchPage extends Object {
    public coreUrl: string;
    public pageNum: number;
    public urls: string[] = [];
    public links: string[][] = [];

    public initUrls(coreUrl: string, pageNum: number): string[] {
        const urls: string[] = [];

        for (let i = 1; i <= pageNum; i++) {
            urls.push(`${coreUrl}${i !== 1 ? `_${i}` : ""}.html`);
        }
        return urls;
    }

    public async getAllLinks(pageUrl: string): Promise<string[]> {
        let links: string[] = [];

        const response: Response = await fetch(pageUrl);
        const pageContent: string = await response.text();

        const domParser: DOMParser = new DOMParser();
        let doc: HTMLDocument = domParser.parseFromString(pageContent, "text/html") ?? Object.create(HTMLDocument);

        const aEles: Element[] = Array.from(doc.querySelectorAll("#newsList a.font1_1[href]"));

        aEles.forEach((v, i, a) => {
            const href = v.getAttribute("href");
            const url = href.match(/[\.\/]?[news\/]?(\d+)\.html/);
            links.push(url[1]);
        });

        let tempSet = new Set(links);
        links = Array.from(tempSet.values());

        return links;
    }

    constructor(coreUrl: string, pageNum: number) {
        super();
        this.coreUrl = coreUrl;
        this.pageNum = pageNum;
        this.urls = this.initUrls(this.coreUrl, this.pageNum);
    }
}

const searchPage: SearchPage = new SearchPage(`http://www.yac8.com/news/?list_refer-theme-%B6%AD%C6%E4%B2%FD`, 19);
logOperation(`${"-".repeat(10)}所有搜索页面的url${"-".repeat(10)}`)
logOperation(searchPage.urls.join(",\n"));


(async function () {
    //索引值，例如第五页为PAGE_START=4
    const PAGE_START = 16;
    const PAGE_END = 20;


    for await (let url of searchPage.urls.slice(PAGE_START - 1, PAGE_END - 1)) {
        searchPage.links.push(await searchPage.getAllLinks(url));
        logOperation(`获取到了${url}的所有连接`);
    }

    logOperation(`${"-".repeat(10)}所有页面链接${"-".repeat(10)}`)
    logOperation(searchPage.links.join(",\n"))

    let searchPageNum = 0;
    for await (let artInOnePages of searchPage.links) {
        let itemNum = 1;

        logOperation(`${"-".repeat(10)}第${searchPageNum + PAGE_START}搜索页面${"-".repeat(10)}`)
        for await (let artPageId of artInOnePages) {
            logOperation(`${"-".repeat(10)}pageId=${artPageId}${"-".repeat(10)}`);
            const artPage: ArtPage = new ArtPage(artPageId);
            await artPage.getPageNum();
            artPage.initUrls();

            logOperation(`共${artPage.pageNum}页`);
            logOperation(artPage.urls.join(",\n"));

            let pageNum = 1;
            for await (let urlForEachPage of artPage.urls) {
                logOperation(`开始爬取${artPageId}页面的第${pageNum}页`);

                await artPage.scrapeImages(urlForEachPage, pageNum)
                    .then(() => logOperation(`${artPageId}页面的第${pageNum}页爬取完毕`))
                    .catch((error) => errorOperation(`${artPageId}页面的第${pageNum}页爬取失败: ${error.message}`));

                ++pageNum;
            }
        }
        searchPageNum++;
    }

    // searchPage.links.push(await searchPage.getAllLinks(searchPage.urls[5]));
    // console.log(searchPage.links[0]);
    //
    // for await (let artInOnePages of searchPage.links) {
    //     let itemNum = 1;
    //
    //     for await (let artPageId of artInOnePages) {
    //         if (itemNum > 5) break;
    //         const artPage: ArtPage = new ArtPage(artPageId);
    //         await artPage.getPageNum();
    //         artPage.initUrls();
    //
    //         let pageNum = 1;
    //         for await (let urlForEachPage of artPage.urls) {
    //             if (pageNum > 6) break;
    //
    //             // console.log(`${artPageId}页面的第${pageNum}页爬取完毕`)
    //             // await artPage.scrapeTest(urlForEachPage);
    //             await artPage.scrapeImages(urlForEachPage, pageNum)
    //                 .then(() => console.log(`${artPageId}页面的第${pageNum}页爬取完毕`))
    //             // .catch((error) => console.error(`${artPageId}页面的第${pageNum}页爬取失败: ${error.message}`));
    //
    //             pageNum++;
    //         }
    //         itemNum++;
    //     }
    // }

})();

/*
* 切记再打开此软件时必须关闭vpn
* deno run --allow-net --allow-write 多页书法网站爬虫.ts
* */
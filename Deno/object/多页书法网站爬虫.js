import { DOMParser, HTMLDocument } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
import { ProgressPrinter } from "../package/ProgressPrinter.ts";
const LOG_FILE_PATH = "./download/log.txt"; // 日志文件路径
function logOperation(msg) {
    console.log(msg);
    // @ts-ignore
    Deno.writeTextFileSync(LOG_FILE_PATH, `${msg}\n`, { append: true });
}
function errorOperation(msg) {
    console.warn(msg);
    // @ts-ignore
    Deno.writeTextFileSync(LOG_FILE_PATH, `error: ${msg}\n`, { append: true });
}
class ArtPage extends Object {
    baseUrl = "http://www.yac8.com/news/";
    pageNum = 0;
    urls = [];
    nameCounter = 0;
    downloadDir = "./download/";
    async downloadImage(url, filename) {
        const response = await fetch(url);
        const imageBuffer = await response.arrayBuffer();
        // @ts-ignore
        await Deno.mkdir(this.downloadDir, { recursive: true });
        // @ts-ignore
        await Deno.writeFile(this.downloadDir + filename, new Uint8Array(imageBuffer));
    }
    setHttpHeader() {
        const headers = new Headers();
        headers.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188");
        headers.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*!/!*;q=0.8,application/signed-exchange;v=b3;q=0.7");
        headers.append("Accept-Encoding", "gzip, deflate, br");
        headers.append("Accept-Language", "en-US,en;q=0.9");
        headers.append("Cache-Control", "max-age=0");
        headers.append("Connection", "keep-alive");
        headers.append("Cookie", "ASPSESSIONIDQWQRTBCS=GAKECIPBOFGLGEHBOCOEHDJG; ASPSESSIONIDSSVQSBDT=HGKECIPBNIEIEHHHGNGHECNC; ASPSESSIONIDQWTRSADS=DNCFCIPBGPLCOILIBAMIIFBA; ASPSESSIONIDSWSRTBCS=EKNCDIPBOHHNDGCNEGCNDDCJ; ASPSESSIONIDQWRQTACT=EBLECIPBLKKMFADPACDEDBDN; ASPSESSIONIDQSVTQACT=FCLECIPBJGNOJDGHKELJGLDH");
        headers.append("Connection", "keep-alive");
        headers.append("Host", "www.yac8.com");
        // headers.append("Referer", "https://www.yac8.com/news/?list_refer-theme-%u8463%u5176%u660C.html");
        return headers;
    }
    // public async scrapeTest(url: string) {
    //     logOperation(url)
    // }
    async scrapeImages(url, pageNum) {
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
        const document = new DOMParser().parseFromString(html, 'text/html');
        //@ts-ignore
        const imageElements = document.querySelectorAll('img');
        const titleElement = document.querySelector("title");
        const h1 = document.querySelector("#mainBody h1");
        // console.log(titleElement.innerHTML)
        let title = h1.innerHTML.match(/^([^\(]+)(?:\(\d+\))?/)[1];
        title.replace(/[\.:\-,\?\\\/]?/, " - ");
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
    async getPageNum() {
        const headers = this.setHttpHeader();
        const response = await fetch(this.baseUrl + ".html", {
            headers,
            method: "get"
        });
        const html = await response.text();
        //@ts-ignore
        const document = new DOMParser().parseFromString(html, 'text/html');
        const divs = Array.from(document.querySelectorAll("table.pageNavBox td div"));
        // this.pageNum = divs.length - 2 > 0 ? divs.length - 2 : 1;
        divs.forEach(div => {
            let pageNum = Number.parseFloat(div.innerText);
            if (pageNum !== pageNum)
                return false;
            this.pageNum = Math.max(this.pageNum, pageNum);
        });
        console.log(this.pageNum);
        return this.pageNum;
    }
    initUrls() {
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
    coreUrl;
    pageNum;
    urls = [];
    links = [];
    initUrls(coreUrl, pageNum) {
        const urls = [];
        for (let i = 1; i <= pageNum; i++) {
            urls.push(`${coreUrl}${i !== 1 ? `_${i}` : ""}.html`);
        }
        return urls;
    }
    async getAllLinks(pageUrl) {
        let links = [];
        const response = await fetch(pageUrl);
        const pageContent = await response.text();
        const domParser = new DOMParser();
        let doc = domParser.parseFromString(pageContent, "text/html") ?? Object.create(HTMLDocument);
        const aEles = Array.from(doc.querySelectorAll("#newsList a.font1_1[href]"));
        aEles.forEach((v, i, a) => {
            const href = v.getAttribute("href");
            const url = href.match(/[\.\/]?[news\/]?(\d+)\.html/);
            links.push(url[1]);
        });
        let tempSet = new Set(links);
        links = Array.from(tempSet.values());
        return links;
    }
    constructor(coreUrl, pageNum) {
        super();
        this.coreUrl = coreUrl;
        this.pageNum = pageNum;
        this.urls = this.initUrls(this.coreUrl, this.pageNum);
    }
}
const searchPage = new SearchPage(`http://www.yac8.com/news/?list_refer-theme-%D5%D4%C3%CF%EE%5C`, 2);
logOperation(`${"-".repeat(10)}所有搜索页面的url${"-".repeat(10)}`);
logOperation(searchPage.urls.join(",\n"));
(async function () {
    //索引值，例如第五页为PAGE_START=4
    const PAGE_START = 1;
    const PAGE_END = 2;
    for await (let url of searchPage.urls.slice(PAGE_START - 1, PAGE_END - 1)) {
        searchPage.links.push(await searchPage.getAllLinks(url));
        logOperation(`获取到了${url}的所有连接`);
    }
    logOperation(`${"-".repeat(10)}所有页面链接${"-".repeat(10)}`);
    logOperation(searchPage.links.join(",\n"));
    // @ts-ignore
    let allLinkLength = searchPage.links.reduce((lv, rv, i, a) => {
        return lv + rv.length;
    }, 0);
    let visitedLink = 0;
    let searchPageNum = 0;
    for await (let artInOnePages of searchPage.links) {
        let itemNum = 1;
        logOperation(`${"-".repeat(10)}第${searchPageNum + PAGE_START}搜索页面${"-".repeat(10)}`);
        for await (let artPageId of artInOnePages) {
            logOperation(`${"-".repeat(10)}pageId=${artPageId}${"-".repeat(10)}`);
            const artPage = new ArtPage(artPageId);
            await artPage.getPageNum();
            debugger;
            artPage.initUrls();
            logOperation(`共${artPage.pageNum}页`);
            logOperation(artPage.urls.join(",\n"));
            let pageNum = 1;
            for await (let urlForEachPage of artPage.urls) {
                logOperation(`开始爬取${artPageId}页面的第${pageNum}页`);
                await artPage.scrapeImages(urlForEachPage, pageNum)
                    .then(() => logOperation(`${artPageId}页面的第${pageNum}页爬取完毕`))
                    .catch((error) => errorOperation(`${artPageId}页面的第${pageNum}页爬取失败: ${error.message}`));
                ProgressPrinter.printProgress(visitedLink / allLinkLength);
                ++pageNum;
            }
            itemNum++;
            visitedLink++;
            ProgressPrinter.printProgress(visitedLink / allLinkLength);
        }
        searchPageNum++;
    }
})();
/*
bug1：
在获取文章页数的时候如果多于10篇会只获取10片，不应该按照元素数量计算
切记再打开此软件时必须关闭vpn
deno run --allow-net --allow-write 多页书法网站爬虫.ts
* */ 

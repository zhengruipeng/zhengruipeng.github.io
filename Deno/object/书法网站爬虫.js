"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var deno_dom_wasm_ts_1 = require("https://deno.land/x/deno_dom/deno-dom-wasm.ts");
var nameCounter = 0;
var downloadDir = "./字帖分享：《王羲之圣教序及其笔法》/";
var assertDir = downloadDir !== null && downloadDir !== void 0 ? downloadDir : "";
var coreUrl = "http://www.yac8.com/news/10243";
var pageNum = 8;
var urls = [];
for (var i = 1; i <= pageNum; i++) {
    urls.push("".concat(coreUrl).concat(i !== 1 ? "_".concat(i) : "", ".html"));
}
function downloadImage(url, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var response, imageBuffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.arrayBuffer()];
                case 2:
                    imageBuffer = _a.sent();
                    // @ts-ignore
                    return [4 /*yield*/, Deno.mkdir(assertDir, { recursive: true })
                        // @ts-ignore
                    ];
                case 3:
                    // @ts-ignore
                    _a.sent();
                    // @ts-ignore
                    return [4 /*yield*/, Deno.writeFile(assertDir + filename, new Uint8Array(imageBuffer))];
                case 4:
                    // @ts-ignore
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function scrapeImages(url) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, response, arrayBuffer, gb2312Bytes, decoder, html, document, imageElements, titleElement, h1, _i, imageElements_1, img, src, imageUrl, filename;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = new Headers();
                    headers.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188");
                    headers.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7");
                    headers.append("Accept-Encoding", "gzip, deflate, br");
                    headers.append("Accept-Language", "en-US,en;q=0.9");
                    headers.append("Cache-Control", "max-age=0");
                    headers.append("Connection", "keep-alive");
                    headers.append("Cookie", "ASPSESSIONIDQWQRTBCS=GAKECIPBOFGLGEHBOCOEHDJG; ASPSESSIONIDSSVQSBDT=HGKECIPBNIEIEHHHGNGHECNC; ASPSESSIONIDQWTRSADS=DNCFCIPBGPLCOILIBAMIIFBA; ASPSESSIONIDSWSRTBCS=EKNCDIPBOHHNDGCNEGCNDDCJ; ASPSESSIONIDQWRQTACT=EBLECIPBLKKMFADPACDEDBDN; ASPSESSIONIDQSVTQACT=FCLECIPBJGNOJDGHKELJGLDH");
                    headers.append("Connection", "keep-alive");
                    headers.append("Host", "www.yac8.com");
                    headers.append("Referer", "https://www.yac8.com/news/?list_refer-theme-%u8463%u5176%u660C.html");
                    return [4 /*yield*/, fetch(url, {
                            headers: headers,
                            method: "get"
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.arrayBuffer()];
                case 2:
                    arrayBuffer = _a.sent();
                    gb2312Bytes = new Uint8Array(arrayBuffer);
                    decoder = new TextDecoder('gb2312');
                    html = decoder.decode(gb2312Bytes);
                    console.log("爬取" + url + "完毕，解析中");
                    document = new deno_dom_wasm_ts_1.DOMParser().parseFromString(html, 'text/html');
                    imageElements = document.querySelectorAll('img');
                    titleElement = document.querySelector("title");
                    h1 = document.querySelector("#mainBody h1");
                    console.log(h1 === null || h1 === void 0 ? void 0 : h1.outerHTML);
                    //如果下载地址为空的话就赋值
                    downloadDir === null &&
                        (downloadDir = "./" + (titleElement === null || titleElement === void 0 ? void 0 : titleElement.innerText) + "/",
                            assertDir = downloadDir);
                    console.log("找到图片" + imageElements.length + "个");
                    _i = 0, imageElements_1 = imageElements;
                    _a.label = 3;
                case 3:
                    if (!(_i < imageElements_1.length)) return [3 /*break*/, 6];
                    img = imageElements_1[_i];
                    src = img.getAttribute('src');
                    imageUrl = new URL(src, url).href;
                    filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
                    return [4 /*yield*/, downloadImage(imageUrl, (++nameCounter) + ".jpg")];
                case 4:
                    _a.sent();
                    console.log("Downloaded: ".concat(filename));
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/];
            }
        });
    });
}
console.log(urls);
(function () {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var _d, urls_1, urls_1_1, url, e_1_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 6, 7, 12]);
                    _d = true, urls_1 = __asyncValues(urls);
                    _e.label = 1;
                case 1: return [4 /*yield*/, urls_1.next()];
                case 2:
                    if (!(urls_1_1 = _e.sent(), _a = urls_1_1.done, !_a)) return [3 /*break*/, 5];
                    _c = urls_1_1.value;
                    _d = false;
                    url = _c;
                    return [4 /*yield*/, scrapeImages(url)
                            .then(function () { return console.log('Scraping completed.'); })
                            .catch(function (error) { return console.error("Error occurred: ".concat(error.message)); })];
                case 3:
                    _e.sent();
                    _e.label = 4;
                case 4:
                    _d = true;
                    return [3 /*break*/, 1];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(!_d && !_a && (_b = urls_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _b.call(urls_1)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
})();
/*
* 切记再打开此软件时必须关闭vpn
* deno run --allow-net --allow-write 书法网站爬虫.ts
* */ 

import {DOMParser, HTMLDocument} from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
// import { TextDecoder, TextEncoder } from 'https://deno.land/std/encoding/mod.ts';

fetch("http://www.yac8.com/news/17849.html")
    .then(response => response.arrayBuffer())
    .then(text => {
        const gb2312Bytes = new Uint8Array(text);

        // 将GB2312字节转换为UTF-8字符串
        const decoder = new TextDecoder('gb2312');
        const gb2312Text = decoder.decode(gb2312Bytes);

        // 将UTF-8字符串转换为UTF-8字节
        // const encoder = new TextEncoder();
        // const utf8Bytes = encoder.encode(gb2312Text);


        const domParser = new DOMParser();
        const doc = domParser.parseFromString(gb2312Text,"text/html");
        let title = doc.querySelector("title").innerHTML;
        console.log(title);
        // console.log(UnicodeToUTF8(title));

        // ;

        // console.log(UnicodeToUTF8(StrToUTF8(title))); // 输出: 你好，世界！
    })
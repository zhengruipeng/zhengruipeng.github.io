/// <reference lib="Deno">
//@ts-ignore
import {ProgressPrinter} from "../package/ProgressPrinter.ts";

interface AllowStringPropVisit {
    [prop: string]: any;
}

declare interface DirEntry {
    name: string;
    isFile: boolean;
    isDirectory: boolean;
}

declare class Deno {
    static readDir(dir: string): Iterable<DirEntry>;
    static writeFile(dir: string, data: Uint8Array): void;
}

let getDirFileNumber = async function (dir: string) {
    let counter = 0;

    for await (let _ of Deno.readDir(dir)) {
        ++counter;
    }

    return counter;
};

let getDirStructure = async function (dir: string, isLoop: boolean = false) {
    let data: AllowStringPropVisit = {};

    let fileNumber: number = await getDirFileNumber(dir);
    let fileCounter: number = 0;

    // console.log("searching: " + dir)
    for await (let dirEntry of Deno.readDir(dir)) {
        if (dirEntry.isFile) {
            data[dirEntry.name] = null;
        } else if (dirEntry.isDirectory) {
            data[dirEntry.name] = await getDirStructure(dir + "\/" + dirEntry.name, true);
        }

        if (!isLoop) {
            ProgressPrinter.printProgress(++fileCounter / fileNumber);
        }
    }

    return data;
};

let writeFile = async function (content: string, dir: string = "./杜野凛世动漫快照.json") {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    await Deno.writeFile(dir, data);
};

(async function main() {
    let dir = prompt("输入盘符，即为?:\\アニメ");
    const name = prompt("输入保存文件名，例如xxxx.json");

    let data: Object = await getDirStructure(dir + ":\\アニメ")
    writeFile(JSON.stringify(data), `./${name}.json`);
})();


/*
deno run --allow-read --allow-write 记录文件夹结构.ts
* */

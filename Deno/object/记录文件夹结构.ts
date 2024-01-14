import {ProgressPrinter} from "../package/ProgressPrinter.ts";

let getDirFileNumber = async function (dir: string): number {
    let counter = 0;

    for await (let _ of Deno.readDir(dir)) {
        ++counter;
    }

    return counter;
};
let getDirStructure = async function (dir: string, isLoop?: boolean = false): Object {
    let data = {};

    let fileNumber: number = await getDirFileNumber(dir);
    let fileCounter: number = 0;

    // console.log("searching: " + dir)
    for await (let dirEntry: DirEntry of Deno.readDir(dir)) {
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

let writeFile = async function (content, dir: string = "./20240113维护galgame目录结构快照.json") {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    await Deno.writeFile(dir, data);
};

(async function main(): void {
    let data: Object = await getDirStructure("J:\\所有新的游戏")

    writeFile(JSON.stringify(data));
})();


/*
deno run --allow-read --allow-write 记录文件夹结构.ts
* */

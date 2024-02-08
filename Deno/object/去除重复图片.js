import { walkSync, existsSync } from "https://deno.land/std/fs/mod.ts";
import { crypto } from "https://deno.land/std@0.196.0/crypto/crypto.ts";
import { toHashString } from "https://deno.land/std@0.196.0/crypto/to_hash_string.ts";
const hashDict = {};
let i = 0;
async function deduplicateImages(folderPath) {
    // 存储每个文件的哈希值
    // 遍历文件夹中的所有文件和子文件夹
    for (const entry of walkSync(folderPath, { includeDirs: false })) {
        if (!entry.isFile ||
            !(entry.name.endsWith(".jpg") ||
                entry.name.endsWith(".png"))) {
            continue;
        }
        // i++;
        // if (i % 100 === 0)
        //     console.log(entry.path);
        // continue;
        // 读取文件内容并计算哈希值
        const fileContent = Deno.readFileSync(entry.path);
        const hash = await crypto.subtle.digest("SHA-384", fileContent);
        const fileHash = toHashString(hash);
        // 如果哈希值已经存在，则说明存在相同的图片，需要删除
        if (fileHash in hashDict) {
            Deno.removeSync(entry.path);
            console.log(`删除文件：${entry.path}`);
        }
        else {
            // 否则，将哈希值存储到字典中
            hashDict[fileHash] = entry.name;
        }
    }
    console.log(folderPath + "去重完成！");
    // 继续递归遍历子文件夹
    for (const entry of walkSync(folderPath, { maxDepth: 1, skip: [".", ".."] })) {
        if (entry.isDirectory) {
            console.log("正在扫描" + entry.path + "目录");
            deduplicateImages(entry.path);
        }
    }
}
// 选择文件夹路径
const folderPath = "E:\\书画作品\\雍正";
if (folderPath && existsSync(folderPath)) {
    deduplicateImages(folderPath);
}
else {
    console.log("指定的文件夹不存在！");
}
/*
* deno run --allow-read --allow-write 去除重复图片.ts
* */ 

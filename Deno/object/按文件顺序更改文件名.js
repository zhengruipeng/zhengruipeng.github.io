// deno-lint-ignore require-await
var DirEntry = Deno.DirEntry;
async function renameFilesInFolder(folderPath) {
    let count = 1;
    let files = [];
    for await (const entry of await Deno.readDir(folderPath)) {
        if (entry.isFile) {
            files.push(entry.name);
            // const oldPath = entry.name;
            //
            // const prefix = oldPath.substring(oldPath.lastIndexOf(".") + 1);
            // const newPath = `${folderPath}/${count}.${prefix}`;
            // console.log(`${folderPath}/${oldPath}`, newPath);
            // await Deno.renameSync(`${folderPath}/${oldPath}`, newPath);
            // count++;
        }
    }
    files.sort((lv, rv, i, a) => {
        if (!Number.isNaN(Number.parseInt(lv) - Number.parseInt(rv))) {
            if (Number.parseInt(lv) < Number.parseInt(rv))
                return -1;
            else if (Number.parseInt(lv) === Number.parseInt(rv))
                return 0;
            else
                return 1;
        }
        else {
            if (lv < rv)
                return -1;
            else if (lv === rv)
                return 0;
            else
                return 1;
        }
    });
    files.forEach((oldPath, i, a) => {
        const prefix = oldPath.substring(oldPath.lastIndexOf(".") + 1);
        const newPath = `${folderPath}/${count}.${prefix}`;
        console.log(`${folderPath}/${oldPath}`, newPath);
        Deno.renameSync(`${folderPath}/${oldPath}`, newPath);
        count++;
    });
}
const folderPath = "D:\\zhengruipeng.github.io\\Deno\\object\\download";
for await (const entry of await Deno.readDir(folderPath)) {
    if (entry.isFile)
        continue;
    await renameFilesInFolder(folderPath + "\\" + entry.name);
    console.log(entry.name + "文件重命名完成。");
}
/*
deno run --allow-write --allow-read 按文件顺序更改文件名.ts
* */ 

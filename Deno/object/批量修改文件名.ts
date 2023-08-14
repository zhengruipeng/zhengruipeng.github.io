/*
* 
*/
const {readDir, rename} = Deno;

// 定义需要修改的文件夹路径和修改的文件名后缀
const folderPath = "C:\\Users\\Miki\\Desktop\\aa";
const newSuffix = "_new";

// 读取文件夹中的所有文件
for await (const dir of await readDir(folderPath)) {
    if (dir.isFile) continue;

    for await (const file of readDir(folderPath + "\\" + dir.name)) {
        // 如果是文件而不是文件夹，则进行文件名修改操作
        if (file.isFile) {
            // 获取原始文件名和扩展名
            let [name, ext] = file.name.split(".");

            // ext = "mp4";

            // 构建新的文件名
            const newName = `${name}${newSuffix}.${ext}`;
            // 执行文件名修改
            await rename(`${folderPath + "\\" + dir.name}/${file.name}`,
                `${folderPath + "\\" + dir.name}/${newName}`);
            console.log(`Renamed ${file.name} to ${newName}`);
        }
    }
}

/*
* deno run --allow-write --allow-read 批量修改文件名.ts
* */
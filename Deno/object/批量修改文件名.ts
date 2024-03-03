/*
* 
*/
const {readDir, rename} = Deno;

// 定义需要修改的文件夹路径和修改的文件名后缀
const folderPath = "C:\\Users\\zheng\\OneDrive\\Desktop\\总之就是非常可爱2";
const newSuffix = "_new";

// 读取文件夹中的所有文件
// for await (const dir of await readDir(folderPath)) {
//     if (dir.isFile) continue;

for await (const file of readDir(folderPath)) {
    // 如果是文件而不是文件夹，则进行文件名修改操作
    if (file.isFile) {
        // 获取原始文件名和扩展名
        let name = file.name;

        let ext = "";

        if (name.indexOf("y2mate.com - ") !== -1) {
            name = name.replace("y2mate.com - ", "");
        }

        if (name.indexOf("mp4") === -1) {
            name += ".mp4";
        }

        // 构建新的文件名
        const newName = `${name}${ext}`;
        // 执行文件名修改
        await rename(`${folderPath}/${file.name}`,
            `${folderPath }/${newName}`);
        console.log(`Renamed ${file.name} to ${newName}`);
    }
}
// }

/*
* deno run --allow-write --allow-read 批量修改文件名.ts
* */
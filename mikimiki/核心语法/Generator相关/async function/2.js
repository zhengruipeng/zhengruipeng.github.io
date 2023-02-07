"use strict";
let fs = require('fs/promises');
(async function () {
    async function* readFiles(directory) {
        const files = await fs.readdir(directory);
        for (const file of files) {
            const stats = await fs.stat(file);
            if (stats.isFile()) {
                yield {
                    name: file,
                    content: await fs.readFile(file, "utf8"),
                };
            }
        }
    }
    const files = readFiles(".");
    console.log(files);
    console.log((await files.next()).value);
    // Possible output: { name: 'file1.txt', content: '...' }
    // console.log((await files.next()).value);
    // Possible output: { name: 'file2.txt', content: '...' }
})();
// export { };

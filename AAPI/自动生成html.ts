// import { writeTextFile, prompt } from "https://deno.land/std/io/mod.ts";

async function generateHTMLFile() {
    const filename = await prompt("请输入文件名（不带后缀）：");
    if (filename.toLowerCase() === "exit") {
        return;
    }

    let htmlContent = "";
    console.log("请输入HTML内容：（输入exit结束输入）：");
    while (true) {
        const line = await prompt("");
        if (line.toLowerCase() === "exit") {
            break;
        }
        htmlContent += line + "\n";
    }

    let jsContent = "";
    console.log("请输入JS内容：（输入exit结束输入）：");
    while (true) {
        const line = await prompt("");
        if (line.toLowerCase() === "exit") {
            break;
        }
        jsContent += line + "\n";
    }
    const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${filename}</title>
    <style></style>
</head>
<body>
${htmlContent}
<script type="text/javascript">
    document.addEventListener("DOMContentLoaded", function () {
        ${jsContent}
    })
</script>
</body>
</html>`;

    try {
        await Deno.writeTextFile(`${filename}.html`, content);
        console.log(`已成功生成文件：${filename}.html`);
        await generateHTMLFile();
    } catch (error) {
        console.error("生成HTML文件时发生错误：", error);
    }
}

await generateHTMLFile();
//deno run --allow-write 自动生成html.ts
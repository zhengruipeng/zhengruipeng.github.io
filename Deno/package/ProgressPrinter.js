import { green } from "https://deno.land/std@0.193.0/fmt/colors.ts";
class ProgressPrinter extends Object {
    static progressLine = 0;
    static progressSymbol = ["-", "\\", "|", "/"];
    static printProgress(progress) {
        const progressBarWidth = 50; // 进度条的宽度
        const filledSymbols = Math.round(progressBarWidth * progress);
        const emptySymbols = progressBarWidth - filledSymbols;
        let progressBar;
        try {
            progressBar = "#".repeat(filledSymbols) + "-".repeat(emptySymbols);
        }
        catch (e) {
        }
        // 将光标移动到当前行的开头
        //@ts-ignore
        Deno.stdout.writeSync(new TextEncoder().encode("\r"));
        this.progressLine++;
        // ANSI 转义序列：将光标移动到行首
        const moveToBeginningOfLine = "\x1b[0G";
        // 输出 ANSI 转义序列
        // Deno.stdout.writeSync(new TextEncoder().encode(moveToBeginningOfLine));
        // 输出进度信息
        //@ts-ignore
        Deno.stdout.writeSync(new TextEncoder().encode(green(`[${progressBar}]${this.progressSymbol[this.progressLine % 4]} ${Math.round(progress * 100)}%\n`)));
    }
}
// console.log(ProgressPrinter)
// let c = 0;
// let t = setInterval(() => {
//     if (c >= 1) clearInterval(t);
//     ProgressPrinter.printProgress(c += 0.1);
// }, 100);
export { ProgressPrinter };

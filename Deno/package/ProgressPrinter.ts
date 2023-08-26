import {green} from "https://deno.land/std@0.193.0/fmt/colors.ts";

class ProgressPrinter extends Object {
    public static progressLine: number = 0;
    private static progressSymbol: string[] = ["-", "\\", "|", "/"];

    public static printProgress(progress: number): void {
        const progressBarWidth = 50; // 进度条的宽度
        const filledSymbols = Math.round(progressBarWidth * progress);
        const emptySymbols = progressBarWidth - filledSymbols;
        let progressBar;
        try {
            progressBar = "#".repeat(filledSymbols) + "-".repeat(emptySymbols);
        } catch (e) {
        }
        // 将光标移动到当前行的开头
        //@ts-ignore
        Deno.stdout.writeSync(new TextEncoder().encode("\r"));

        this.progressLine++;
        // 输出进度信息
        //@ts-ignore
        Deno.stdout.writeSync(new TextEncoder().encode(green(`[${progressBar}]${this.progressSymbol[this.progressLine % 4]} ${Math.round(progress * 100)}%\n`)));
    }
}

export {ProgressPrinter};
// ChatGPT 3.5 API端点
const apiEndpoint = "https://api.openai.com/v1/engines/davinci-codex/completions";
// 设置OpenAI API密钥
const apiKey = "YOUR_API_KEY";
// 发送请求给ChatGPT 3.5
async function sendRequest(prompt) {
    const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 50 // 根据需要设置生成的最大令牌数
        })
    });
    const { choices } = await response.json();
    const generatedText = choices[0].text.trim();
    return generatedText;
}
// 示例用法
async function main() {
    const prompt = "你好，ChatGPT！";
    const response = await sendRequest(prompt);
    console.log(response);
}
// 运行示例
main();

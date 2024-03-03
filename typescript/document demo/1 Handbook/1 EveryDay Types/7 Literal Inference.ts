declare function handleRequest(url: string, method: "GET" | "POST"): void;

let req = { url: "https://example.com", method: "GET" };
//@ts-expect-error
handleRequest(req.url, req.method);

/*
* 在上面的例子中req.method被推断为string，不是"GET"。
* 因为代码可以在创建req和调用handleRequest之间对对象进行修改，
* 可以分配一个新的字符串，
* 比如吧"GUESS"赋值给req.method，
* 所以TypeScript 认为这段代码有错误。
* */


// 有两种方法可以解决这个问题。
// 您可以通过在任一位置添加类型断言来更改推断：

// Change 1:
req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(req.url, req.method as "GET");

/*
* 更改 1 意味着“我打算req.method始终具有文字类型 "GET"”，
* 从而防止之后可能"GUESS"对该字段进行分配。
* 变化 2 的意思是“我知道由于其他原因req.method有"GET"值。
* */

//您可以使用as const将整个对象转换为类型文字：
req = { url: "https://example.com", method: "GET" } as const;
//@ts-expect-error
handleRequest(req.url, req.method);
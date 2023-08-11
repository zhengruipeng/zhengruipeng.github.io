let formData = new FormData();
formData.append("username", "1234");
formData.append("password", "1234");
let headers = new Headers();
headers.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36");

fetch("http://www.baidu.com", {
    method: "get",
    headers: new Headers()
}).then(response => {
    console.log(response);
    return response.text();
})
    .then(json => {
        console.log(json);
    })
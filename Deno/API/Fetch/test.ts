const formdata: FormData = new FormData();
formdata.append("username", "admin");
formdata.append("password", "123456");

const headers = new Headers();
headers.append("Accept","*/*");
headers.append("Content-Type","application/json");

fetch("http://localhost:3000/shop-service/v1/app", {
    method: "get",
    // body: formdata,
    headers,

})
    .then(response => {
        console.log(response);
        return response.text()
    })
    .then(json => {
        console.log(json);
    })

/*
deno run --allow-net test.ts
*/
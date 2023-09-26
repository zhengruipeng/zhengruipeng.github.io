async function sendRequest() {
    const url = "http://localhost:3000/shop-service/v1/app";
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log("Response:", data);
        }
        else {
            console.log("Request failed with status:", response.status);
        }
    }
    catch (error) {
        console.log("Error:", error.message);
    }
}
sendRequest();
/*
deno run --allow-net test2.ts
*/ 

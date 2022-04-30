postMessage("worker.js");
console.log("worker");
onmessage = function (e){
    console.log("worker has received "+e.data);
}
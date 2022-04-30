let getFile = {
    getFile(src){
        let xhr = new XMLHttpRequest();
        xhr.open("GET",src,false);
        xhr.setRequestHeader("type","text/plain");
        xhr.send(null);
        return xhr.responseText;

    }
}
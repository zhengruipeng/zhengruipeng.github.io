const getFile = function (src){
    let xhr = new XMLHttpRequest();
    xhr.open("GET",src,false);
    xhr.setRequestHeader("type","text/plain");
    xhr.send();
    /*xhr.onreadystatechange = function (){
        if(xhr.readyState === 4 && xhr.status === 200){
            callback?callback(xhr):xhr;
        }
    }*/
    return xhr.response || xhr.responseText;
};
// export {getFile}
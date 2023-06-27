window.fetch2 = function (url,inits){
    let createIframe = function (){
        let iframe = document.createElement("iframe");
        return iframe;
    };

    let getFormEleFromFormData = function (formData){
        let formele = document.createElement("form");
        for(let value of formData.entries()){
            // console.log(value);
            let inputEle = document.createElement("input");
            inputEle.type = "hidden";
            inputEle.name = value[0];
            inputEle.value = value[1];
            // console.log(inputEle)
            formele.appendChild(inputEle);
        }
        let inputEle = document.createElement("input");
        inputEle.type = "submit";
        formele.appendChild(inputEle);
        return formele;
    };

    let setRequestIntoForm = function (request,form){
        let method = request.method || "GET";

        let headers = request.headers;
        let url = request.url;
        let enctype = "application/x-www-form-urlencoded";
        if(headers.get("content-type")){
            enctype = headers.get("content-type")?.indexOf("multipart/form-data") !== -1?
                "multipart/form-data":
                "application/x-www-form-urlencoded";

        }
    /*    let enctype = headers.get("content-type")?.indexOf("multipart/form-data") !== -1?
            "multipart/form-data":
            "application/x-www-form-urlencoded";*/
        form.action = url;
        form.method = method;
        form.enctype = enctype;

    };

    let request = null;
    if(arguments.length === 1)request = url;
    request = new Request(url,inits);

    let formData = null;
    if(request.method === "POST"){
        formData = inits.body;
        formData = formData || new FormData();
    }else if(request.method === 'GET'){
        formData = new FormData;
        let params = request.url.substring(request.url.indexOf("?")+1);
        params = params.split("&");
        params.forEach(param => {
            let [key,value] = param.split('=');
            formData.set(key,value);
        })
    }

    let formEle = getFormEleFromFormData(formData)
    setRequestIntoForm(request,formEle)
    let doc = document.implementation.createHTMLDocument("temp");
    doc.body.appendChild(formEle);

    let iframe = document.createElement("iframe");
    iframe.srcdoc = `<!DOCTYPE html><html>${doc.documentElement.innerHTML}</html>`;
    iframe.style.display = "none";
    // iframe.srcdoc = doc.documentElement.innerHTML;
    document.body.appendChild(iframe);
    const win = iframe.contentWindow;
    let originText = win.document.documentElement.innerHTML;
    win.onload = function (){
        originText = win.document.documentElement.innerHTML;
        let form = win.document.forms[0];
        let submitBtn = form.querySelector("input[type='submit']");

        submitBtn.click();

    }
    return new Promise(function (resolve, reject){
        //当第一个表单页面发生跳转时触发卸载事件
            win.onunload = function () {
                try {
                    //触发卸载事件之后计时，直到页面刷新为止。
                    let timer = setInterval(function () {
                        // console.log("interval");
                        let responseText = win.document.documentElement?.innerHTML;
                        if (responseText !== originText && responseText) {
                            //这里的代码会被触发两次
                            clearInterval(timer);
                            // console.log(responseText);
                            // console.log(originText);
                            resolve(new Response(responseText, {status: 200}));
                            // iframe.parentNode.removeChild(iframe);
                            // console.log(iframe.parentElement);
                            iframe.parentElement?.removeChild(iframe);
                        }
                    }, 16);
                    setTimeout(function () {
                        clearInterval(timer);
                        reject("request time out");
                    }, 5000);
                }catch (e){}
            }

    })

}
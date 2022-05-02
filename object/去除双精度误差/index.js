window.haffman.DoublePrecisionEPSILON = function (){

}
window.haffman.DoublePrecisionEPSILON.prototype = {};
window.haffman.DoublePrecisionEPSILON.prototype.constructor = window.haffman.DoublePrecisionEPSILON;
window.haffman.DoublePrecisionEPSILON.times10n = function (x,n){
    let strX = x+'';
    if(strX.indexOf(".") !== -1){
        let pos = strX.indexOf(".");
        strX = strX.split('.').join("");
        if(pos+n<strX.length){
            strX = strX.substring(0,pos+n)+"."+strX.substring(pos+n);
        }else{
            let zeroN = pos+n-strX.length;
            strX = strX+(new Array(zeroN).fill('0').join(""));
        }
    }else{
        strX = strX + (new Array(n).fill('0').join(""));
    }
    strX -= 0;
    return strX;
}
//change the number of array into int form
window.haffman.DoublePrecisionEPSILON.toIntForm = function (arr){
    //clone the array and
    // init the var aimed to the max length of the number decimals
    let elements = Array.from(arr);
    let maxLen = 0;
    //statistics the max length of the number decimals
    elements.forEach(v => {
        if((v+'').indexOf('.') !== -1){
            maxLen = Math.max(maxLen,(v+'').substring((v+'').indexOf('.')).length-1)
        }
    } );
    //the double float`s max length is 16
    if(maxLen>16){
        maxLen = 16;
        elements = elements.map(v => (v+'').substring(0,16)-0);
    }
    //make all of the number to integer
    //because the number times 10 will cause error probably ,
    //so we use the array instead of 10**maxLen
    elements = elements.map(v => {
        // return v*(10**maxLen);
        let arr = new Array(maxLen+1).fill("0");
        arr[0] = '1';
        // return v*(arr.join("")-0);
        return window.haffman.DoublePrecisionEPSILON.times10n(v,maxLen)
        //some number times 10 will cause error such as:4.27,5.1
        //we may define the function used to times 10 in string to repair this bug
    });
    let pointPos = maxLen;
    return {elements,pointPos};
};
window.haffman.DoublePrecisionEPSILON.add = function (...arr){
    //change all of the float into integer
    let {elements,pointPos} = window.haffman.DoublePrecisionEPSILON.toIntForm(arr);

    //calculate the sum of the elements
    let calcRes = elements.reduce((pv,cv,i,a) => {
        return pv+cv;
    })

    //according to the record of the decimal point position
    //we insert the point at the incorrect position
    //and then ,change it into float number
    let resStr = calcRes+'';
    resStr = resStr.substring(0,resStr.length-pointPos)+"."+resStr.substring(resStr.length-pointPos);
    let res = Number.parseFloat(resStr);
    return res;
};
window.haffman.DoublePrecisionEPSILON.minus = function (...arr){
    let {elements,pointPos} = window.haffman.DoublePrecisionEPSILON.toIntForm(arr);
    let calcRes = elements.reduce((pv,cv,i,a) => {
        return pv-cv;
    })
    let resStr = calcRes+'';
    resStr = resStr.substring(0,resStr.length-pointPos)+"."+resStr.substring(resStr.length-pointPos);
    let res = Number.parseFloat(resStr);
    return res;
    // return calcRes/(10**pointPos);
};
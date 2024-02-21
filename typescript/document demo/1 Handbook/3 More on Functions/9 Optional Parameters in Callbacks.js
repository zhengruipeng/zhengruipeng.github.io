function myForEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}
myForEach([1, 2, 3], (a, i) => {
    console.log(i.toFixed());
});
/*规则：为回调编写函数类型时，切勿编写可选参数，除非您打算在不传递该参数的情况下调用该函数*/ 

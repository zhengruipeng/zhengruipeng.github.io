(function (){
    const geolocationContainer = document.getElementById("geolocation");
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    let outputInfo = function (msg){
        geolocationContainer.innerHTML += msg + "<br />";
    }
    let success = function (pos) {
        var crd = pos.coords;

        outputInfo('你当前的位置是:');
        outputInfo(`经度 : ${crd.latitude}`);
        outputInfo(`维度: ${crd.longitude}`);
        outputInfo(`误差大约 ${crd.accuracy} 米`);
    }

    let error = function (err) {
        outputInfo(`获取地理信息错误：`);
        outputInfo(`请检查您是否授权以及当地GPS信号是否良好：`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
})();
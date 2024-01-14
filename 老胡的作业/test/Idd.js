function showcity(oShengSelect)
{
    var shengid = oShengSelect.value;
    clearCity();
    var oSelectcity = document.getElementById('city');
    for(var i=0;i<citys.length;i++){
        var oCity = citys[i];
        if(oCity.shengid === shengid){
            var oOption = document.createElement('option');
            oOption.text = oCity.cityname;
            oOption.value = oCity.cityno;
            oSelectcity.add(oOption);
        }
    }
    
}
function clearCity(){
    var oSelectCity = document.getElementById('city');
    var aOption = oSelectCity.options;
    var gs = aOption.length;
    for( var i=1;i<=gs-1;i++){
        oSelectCity.remove(1);
    }
}
import {LocationMap} from "../../../libs/LocationMap.js"
import {notify} from "../../../public/notification/notification.js"

document.addEventListener("DOMContentLoaded",function (){
	const financeDataTable = this.querySelector("#finance-data-table");
	const prePageBtn = this.querySelector("#table-pre-page");
	const nextPageBtn = this.querySelector("#table-next-page");
	
	//表格中的行放到数组
	const tds = Array.from(financeDataTable.querySelectorAll("tr"));
	
    let tablePage = 1;
    
    let locationMap = new LocationMap(location);
    let obj = locationMap.getSearchMap();
    //如果get中有page参数就用，否则默认值取1
    tablePage = obj.page || 1;
    
    prePageBtn.onclick = function (){
		if(tablePage <= 1){
			notify.println("这是第一页");
			return false;
		}
		
		obj.page = --tablePage;
		location.search = locationMap.getSearchStr(obj); 
	}; 
			console.log(tds);

    nextPageBtn.onclick = function (){
		if(tds.length < 11){
			notify.println("没有这一页");
			return false;
		}
		
		obj.page = ++tablePage;
		location.search = locationMap.getSearchStr(obj);
 	};
	
});
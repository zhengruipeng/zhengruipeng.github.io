document.addEventListener("DOMContentLoaded",function () {
    const financeModule = this.getElementById("finance-module");
    const employeeModule = this.getElementById("employee-module");
    const materialModule = this.getElementById("material-module");
    const productModule = this.getElementById("product-module");
    const userModule = this.getElementById("user-module");
    const uploadModule = this.getElementById("upload-module");


//			 <div class="module-button" id="finance-module">进入到金融页面</div>
	financeModule.onclick = function (){
		location = "http://localhost:8090/SSH_03_UserAdd/finance/finance_index";	

	};
	
//			 <div class="module-button" id="employee-module">进入到雇佣工页面</div>
	employeeModule.onclick = function (){
		location = "http://localhost:8090/SSH_03_UserAdd/employee/employee_index";	
	};
	
//			 <div class="module-button" id="material-module">进入到材料页面</div>
	materialModule.onclick = function (){
		location = "http://localhost:8090/SSH_03_UserAdd/material/material_index";	
	};
		
//			 <div class="module-button" id="product-module">进入到油品页面</div>
	productModule.onclick = function (){
		location = "http://localhost:8090/SSH_03_UserAdd/product/product_index";	
	};
		
				
//			 <div class="module-button" id="user-module">进入到用户页面</div>
	userModule.onclick = function (){
		location = "http://localhost:8090/SSH_03_UserAdd/user/user_index";	
	};
	
//			 <div class="module-button" id="upload-module">进入到金融页面</div>
	uploadModule.onclick = function (){
		location = "http://localhost:8090/SSH_03_UserAdd/upload/index";	
	};
	
});
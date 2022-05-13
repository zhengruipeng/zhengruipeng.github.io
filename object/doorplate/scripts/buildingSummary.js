(function (){
    let show = false;
    let buildingS = document.getElementById("buildingSummary");
    buildingS.onclick = function (){
        if(!show){
            buildingS.innerText = "东北石油大学综合实验楼项目是国家2019年教育现代化推进工程，是经国家发改委、教育部批准立项的国家中西部高校基础能力建设工程，同时也是今年黑龙江省“百大项目”之一，项目总投资1.27亿元，总用地面积29188.78平方米，总建筑面积29973.52平方米。\n" +
                "整个实验楼呈‘工’字形，总共有12个塔，分为A、B、C三个部分，地上5层，局部4、3、1层，没有地下室，建筑物高度为23.96米。”\n" +
                "综合实验楼左侧是图书馆，右侧是二号教学楼，建成后能容纳4000多名师生实验实训，里面有10个开放共享实验平台、大学生创新创业中心以及部分教学实验用房。综合实验楼建成投入使用后将大大改善学校育人环境。"
            buildingS.style.top = "10%";
            buildingS.style.left = "10%";
            buildingS.style.height = "80%";
            buildingS.style.width = "80%";
            show = true;

        }else{
            buildingS.innerText = " 实验楼简介："
            buildingS.style.top = "100px";
            buildingS.style.left = "0";
            buildingS.style.height = "30px";
            buildingS.style.width = "200px";
            show = false;
        }

    };

})()
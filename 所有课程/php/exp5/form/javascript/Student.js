let Student = function (/*id,name,age,score*/){
    this.selected = document.createElement("span");
    this.selected.className = "select-justify"
    this.selected.addEventListener("click",function (){
        this.classList.toggle("select-justify-ensure");
    })
    // this.selected.type = "checkbox";
    // this.id = id;
    // this.name = name;
    // this.age = age;
    // this.score = score;
    let updateBtn = document.createElement("button");
    updateBtn.innerHTML = "修改";
    updateBtn.className = "update";

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "删除";
    deleteBtn.className = "delete";

    this.operation = [
        updateBtn,
        deleteBtn
    ];
};
Student.prototype = {};
Student.prototype.constructor = Student;
export {Student};
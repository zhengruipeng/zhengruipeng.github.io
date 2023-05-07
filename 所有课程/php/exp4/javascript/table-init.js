import {MyApp} from "./config.js";
import {Student} from "./Student.js";
import {IndexedDBCurd} from "./indexedDB-curd.js";

document.addEventListener("DOMContentLoaded",function (){

    let initTrWithStudentInfo = function (student){
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        let td7 = document.createElement("td");
        td1.appendChild(student.selected);
        td2.appendChild(document.createTextNode(student.id));
        td3.appendChild(document.createTextNode(student.name));
        td4.appendChild(document.createTextNode(student.age));
        td5.appendChild(document.createTextNode(student.score));
        td6.appendChild(student.operation[0]);
        td7.appendChild(student.operation[1]);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);


        return tr;

    }
    let initRandom = function (length){
        let str = "";
        for(let i = 0;i<length;i++){
            str += Math.floor(Math.random()*10);
        }
        return str;
    };
    let students = [];
    MyApp.customEvent.addListener("databaseOnSuccess",function (){
        console.log(1);

        const tbody = document.querySelector("table>tbody");
        const colgroup = document.querySelector("table>colgroup");

        students.push(new Student("200702940816","郑瑞蓬","17","星见production"))

        IndexedDBCurd.getAll(function (res){

            res.forEach(student => {
                student = new Student(student.id,student.sname,student.sage,student.sdept);
                students.push(student);

                let tr = initTrWithStudentInfo(student);
                tbody.appendChild(tr);
                tr.style.height = tr.getBoundingClientRect().height+"px";
            });

            let col1 = document.createElement("col");
            let col2 = document.createElement("col");
            let col3 = document.createElement("col");
            let col4 = document.createElement("col");
            let col5 = document.createElement("col");
            let col6 = document.createElement("col");
            let col7 = document.createElement("col");

            colgroup.appendChild(col1);
            colgroup.appendChild(col2);
            colgroup.appendChild(col3);
            colgroup.appendChild(col4);
            colgroup.appendChild(col5);
            colgroup.appendChild(col6);
            colgroup.appendChild(col7);

            MyApp.data.students = students;
            MyApp.customEvent.dispatchEvent("tableinit");
        })
    });

});

import {MyApp} from "../../../../../../public/config.js"
import {Student} from "../model/Student.js";
import {IndexedDBCurd} from "../../../../../../public/indexedDB-curd.js";

document.addEventListener("DOMContentLoaded",function (){

    let initTrWithStudentInfo = function (student){
        let tr = document.createElement("tr");

        for(let name in student){
            let td = document.createElement("td");
            if(name === "constructor")continue;

            if(name !== "operation"){
                /*console.log((typeof student[name] === "string")?
                    document.createTextNode(student[name]):
                    student[name]);
                console.log(name);*/
                td.appendChild((typeof student[name] === "string")?
                    document.createTextNode(student[name]):
                    student[name]);
                td.className = name;
                tr.appendChild(td);
            }else{
                let td2 = document.createElement("td");

                td.appendChild(student.operation[0]);
                td2.appendChild(student.operation[1]);

                td.className = name;
                td2.className = name;

                tr.appendChild(td);
                tr.appendChild(td2);
                continue;
            }

        }

        return tr;

    };
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

        const thead = document.querySelector("table>thead");
        const tbody = document.querySelector("table>tbody");
        const colgroup = document.querySelector("table>colgroup");

        // students.push(new Student("200702940816","郑瑞蓬","17","星见production"))
        // console.log(MyApp.tableCols);
        IndexedDBCurd.getAll(function (res){

            res.forEach(student => {
                let stu = new Student(/*student.id,student.sname,student.sage,student.sdept*/);
                MyApp.tableCols.forEach(col => {
                    stu[col] = student[col];
                });

                students.push(stu);

                let tr = initTrWithStudentInfo(stu);
                tbody.appendChild(tr);
                tr.style.height = tr.getBoundingClientRect().height+"px";
            });

            let theadTr = document.createElement("tr");

            (function (){
                let col = document.createElement("col");
                colgroup.appendChild(col);

                let th = document.createElement("th");
                th.innerHTML = "选中";
                theadTr.appendChild(th);

                col = document.createElement("col");
                colgroup.appendChild(col);
                col = document.createElement("col");
                colgroup.appendChild(col);

                th = document.createElement("th");
                th.innerHTML = "操作";
                th.colSpan = "2";
                theadTr.appendChild(th);
            })();

            MyApp.tableCols.forEach(_ => {
                let col = document.createElement("col");
                colgroup.appendChild(col);

                let th = document.createElement("th");
                th.innerHTML = _;
                theadTr.appendChild(th);
            })
            thead.appendChild(theadTr);


            MyApp.data.students = students;
            MyApp.customEvent.dispatchEvent("tableinit");
        })
    });

});

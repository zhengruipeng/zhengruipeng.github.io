// pages/hello/hello.js
let User = class extends Object{
    id;
    name;
    info;
    constructor(id,name,info){
        super();
        this.id = id;
        this.name = name;
        this.info = info;
    }
}

Page({
  
    /**
     * Page initial data
     */
    data: {
        imageUrl: ["/images/image/1.jpg",
            "/images/image/2.jpg",
            "/images/image/3.jpg",
            "/images/image/4.jpg",
            "/images/image/5.jpg",
            "/images/image/6.jpg",
            "/images/image/7.jpg",
            "/images/image/8.jpg",
            "/images/image/9.jpg",
        ],
        users:[
            new User(1,"vhsj","no 1"),
            new User(2,"lisi","no 2")
        ],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 2000,
        duration: 500
    },
    buttonClick(){
        console.log(123);
    },
    click2(ev){
        let target = ev.target || ev.srcElement;
        let id = target.dataset.id;
        console.log(id,target);
    }
})
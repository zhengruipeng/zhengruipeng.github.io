registerPaint("highLight",class{
    static get contextOptions() {
        return { alpha: true };
    }
    static get inputProperties(){
        return ["--paint-color"];
    }
    static get inputArguments() { return ['*','*']; }
    paint(c,size,attr,args){
        console.log(args);
        c.fillStyle = "red";
        c.fillRect(0,size.height*0.3,size.width*0.3,size.height*0.6);

        /*c.fillStyle = attr.get("--paint-color");
        c.strokeStyle = attr.get("--paint-color");
        let strokeWidth = args[1] ? args[1] : "0";
        c.lineWidth = parseInt(strokeWidth);
        if(args[0].toString() === "stroke")
            c.strokeRect(0,size.height*0.3,size.width*0.3,size.height*0.6);
        else
            c.fillRect(0,size.height*0.3,size.width*0.3,size.height*0.6);*/
    }
});
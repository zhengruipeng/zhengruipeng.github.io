(function (){
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    for(let x = 30;x<WIDTH;x+=30){
        c.moveTo(x,0);
        c.lineTo(x,HEIGHT);
    }

    for(let y = 30;y<HEIGHT;y+=30){
        c.moveTo(0,y);
        c.lineTo(WIDTH,y);
    }

    c.strokeStyle = "green";
    c.stroke();
})()
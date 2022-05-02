(function (){
    var point = new DOMPoint(5, 4);
    var scaleX = 2;
    var scaleY = 3;
    var translateX = 12;
    var translateY = 8;
    var angle = Math.PI / 2;
    var matrix = new DOMMatrix([
        /*Math.sin(angle) * scaleX,
        Math.cos(angle) * scaleX,
        -Math.sin(angle) * scaleY,
        Math.cos(angle) * scaleY,
        translateX,
        translateY*/
        1,0,0,1,0,0,
    ]);
    matrix = matrix.rotate(90,0,0);
    matrix = matrix.scale(1,1);
    // matrix = matrix.translate(1,2);

    // matrix = matrix.rotate(0,0,0);
    var transformedPoint = point.matrixTransform(matrix);


    c.fillStyle = "red";
    c.fillRect(point.x*30,point.y*30,30,30);
    c.fillRect(transformedPoint.x*30,transformedPoint.y*30,30,30);

})();
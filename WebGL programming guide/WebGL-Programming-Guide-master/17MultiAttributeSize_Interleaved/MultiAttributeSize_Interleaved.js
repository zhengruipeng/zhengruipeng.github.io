/**
 * Created by hushhw on 17/12/14.
 */
//MultiAttributeSize.js
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() {\n' +
    'gl_Position = a_Position;\n' +
    'gl_PointSize = a_PointSize;\n' +
    '}\n';

var FSHADER_SOURCE=
    'void main(){'+
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);'+
    '}';

function main() {

    var canvas = document.getElementById("webgl");
    if (!canvas) {
        console.log("Failed to retrieve the <canvas> element");
        return;
    }

    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shaders.");
        return;
    }

    //设置顶点位置
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    //指定清空<canvas>颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl) {
    var verticesSizes = new Float32Array(
        [0.0, 0.5, 10.0,
        -0.5, -0.5, 10.0,
        0.5, -0.5, 30.0]
    );
    var n=3; //点的个数


    //创建缓冲区对象
    var vertexSizeBuffer = gl.createBuffer();
    if(!vertexSizeBuffer){
        console.log("Failed to create thie buffer object");
        return -1;
    }
    //将缓冲区对象保存到目标上
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer);

    //向缓存对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);

    var FSIZE = verticesSizes.BYTES_PER_ELEMENT;

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0){
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }
    //将缓冲区对象分配给a_Postion变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*3, 0);
    //连接a_Postion变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if(a_Position < 0){
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }

    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE*3, FSIZE*2);
    gl.enableVertexAttribArray(a_PointSize);

    return n;
}
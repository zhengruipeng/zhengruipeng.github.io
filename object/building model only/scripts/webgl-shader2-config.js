(function (){
    let gl = globalVar.threeD.gl;
    let initUniform = globalVar.threeD.initUniform;
    let initShader = globalVar.threeD.initShader;
    let vertex = globalVar.threeD.shaders[1][0];
    let fragment = globalVar.threeD.shaders[1][1];

    // initShaders(gl,vertex.innerText,fragment.innerText);
    gl.SHADER_PROGRAM1 = initShader(vertex,fragment);
    gl.useProgram(gl.SHADER_PROGRAM1);

    let perspective_pos = globalVar.threeD.camera.position;
    let lookAt = globalVar.threeD.camera.lookAt;

    let perspectiveC = new globalVar.threeD.perspectiveCamera(...perspective_pos,...lookAt,0,1,0,20,webgl.width/webgl.height,.1,1000);
    let perspectiveMatrix = perspectiveC.matrix;


    initUniform("u_perspective",perspectiveMatrix,"Matrix4fv",gl.SHADER_PROGRAM1);


})();
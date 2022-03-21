(function (){
    let gl = globalVar.threeD.gl;
    let initUniform = globalVar.threeD.initUniform;
    let initShader = globalVar.threeD.initShader;
    let vertex = globalVar.threeD.shaders[0][0];
    let fragment = globalVar.threeD.shaders[0][1];

    // initShaders(gl,vertex.innerText,fragment.innerText);
    gl.SHADER_PROGRAM0 = initShader(vertex,fragment);
    gl.useProgram(gl.SHADER_PROGRAM0);

    let perspective_pos = [80,75,130];
    let lookAt = [0,0,0];
    globalVar.threeD.camera.position = perspective_pos;
    globalVar.threeD.camera.lookAt = lookAt;
    let perspectiveC = new globalVar.threeD.perspectiveCamera(...perspective_pos,...lookAt,0,1,0,20,webgl.width/webgl.height,.1,1000);
    let perspectiveMatrix = perspectiveC.matrix;


    initUniform("u_perspective",perspectiveMatrix,"Matrix4fv",gl.SHADER_PROGRAM0);
    initUniform("u_change",new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),"Matrix4fv",gl.SHADER_PROGRAM0);
    initUniform("u_trans",new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),"Matrix4fv",gl.SHADER_PROGRAM0);
    initUniform("u_ambient",[.1,.1,.1,1],"4f",gl.SHADER_PROGRAM0);
    initUniform("u_point_pos",[80,75,130,1],"4f",gl.SHADER_PROGRAM0);
    initUniform("u_point_color",[1,1,1,1],"4f",gl.SHADER_PROGRAM0);
    initUniform("u_reduction_a",[.3],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_reduction_b",[.3],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_reduction_c",[.3],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_diffuse_intensity",[10000],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_mirror_intensity",[10000],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_diffuse_reflection",[1],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_mirror_reflection",[1],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_highLight",[1],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_perspective_pos",perspective_pos.concat([1]),"4f",gl.SHADER_PROGRAM0);

})();
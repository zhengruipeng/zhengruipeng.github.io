(function (){
    let gl = globalVar.threeD.gl;

    let initBuffer = globalVar.threeD.initBuffer;
    let initArrayBuffer = globalVar.threeD.initArrayBuffer;

    let [vertices,normals,colors,texture,indices,triangleIndices] = globalVar.threeD.geometry.building12();

    let building11 = gl.createVertexArray();
    gl.bindVertexArray(building11);
    initBuffer("a_position",vertices,gl.SHADER_PROGRAM0);
    initBuffer("a_normal",normals,gl.SHADER_PROGRAM0);
    initBuffer("a_color",colors,gl.SHADER_PROGRAM0);
    initArrayBuffer(indices);
    globalVar.threeD.data.building12 = {vertexArray:building11,vertices,normals,colors,texture,indices,triangleIndices};
})()


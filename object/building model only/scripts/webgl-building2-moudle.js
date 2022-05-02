(function (){
    let gl = globalVar.threeD.gl;

    let initBuffer = globalVar.threeD.initBuffer;
    let initArrayBuffer = globalVar.threeD.initArrayBuffer;


    let [vertices,normals,colors,texture,indices,triangleIndices] = globalVar.threeD.geometry.building2();

    let building2VertexArr = gl.createVertexArray();
    gl.bindVertexArray(building2VertexArr);
    initBuffer("a_position",vertices,gl.SHADER_PROGRAM0);
    initBuffer("a_normal",normals,gl.SHADER_PROGRAM0);
    initBuffer("a_color",colors,gl.SHADER_PROGRAM0);
    // initArrayBuffer(triangleIndices);
    initArrayBuffer(indices);
    globalVar.threeD.data.building2 = {vertexArray:building2VertexArr,vertices,normals,colors,texture,indices,triangleIndices};
})()


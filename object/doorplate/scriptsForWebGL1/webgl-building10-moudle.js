(function (){
    let gl = globalVar.threeD.gl;

    let initBuffer = globalVar.threeD.initBuffer;
    let initArrayBuffer = globalVar.threeD.initArrayBuffer;

    let [vertices,normals,colors,texture,indices,triangleIndices] = globalVar.threeD.geometry.building10();

   /* let building10 = gl.createVertexArray();
    gl.bindVertexArray(building10);*/
    var oes_vao_ext = gl.getExtension('OES_vertex_array_object');
    var building10 = oes_vao_ext.createVertexArrayOES();
    oes_vao_ext.bindVertexArrayOES(building10);
    initBuffer("a_position",vertices,gl.SHADER_PROGRAM0);
    initBuffer("a_normal",normals,gl.SHADER_PROGRAM0);
    initBuffer("a_color",colors,gl.SHADER_PROGRAM0);
    // initArrayBuffer(triangleIndices);
    initArrayBuffer(indices);
    globalVar.threeD.data.building10 = {vertexArray:building10,vertices,normals,colors,texture,indices,triangleIndices};
})()


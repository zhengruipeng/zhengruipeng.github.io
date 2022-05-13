(function (){
    let gl = globalVar.threeD.gl;

    let initBuffer = globalVar.threeD.initBuffer;
    let initArrayBuffer = globalVar.threeD.initArrayBuffer;


    let [vertices,normals,colors,texture,indices,triangleIndices] = globalVar.threeD.geometry.building4Center();

   /* let building4Center = gl.createVertexArray();
    gl.bindVertexArray(building4Center);*/
    var oes_vao_ext = gl.getExtension('OES_vertex_array_object');
    var building4Center = oes_vao_ext.createVertexArrayOES();
    oes_vao_ext.bindVertexArrayOES(building4Center);
    initBuffer("a_position",vertices,gl.SHADER_PROGRAM0);
    initBuffer("a_normal",normals,gl.SHADER_PROGRAM0);
    initBuffer("a_color",colors,gl.SHADER_PROGRAM0);
    // initArrayBuffer(triangleIndices);
    initArrayBuffer(indices);
    globalVar.threeD.data.building4Center = {vertexArray:building4Center,vertices,normals,colors,texture,indices,triangleIndices};
})()


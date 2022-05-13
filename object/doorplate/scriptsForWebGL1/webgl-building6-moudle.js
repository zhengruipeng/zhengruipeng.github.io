(function (){
    let gl = globalVar.threeD.gl;

    //let sphere = globalVar.threeD.geometry.sphere;
    let initBuffer = globalVar.threeD.initBuffer;
    let initArrayBuffer = globalVar.threeD.initArrayBuffer;

    let [vertices,normals,colors,texture,indices,triangleIndices] = globalVar.threeD.geometry.building6Left();


   /* let building6Left = gl.createVertexArray();
    gl.bindVertexArray(building6Left);*/
    var oes_vao_ext = gl.getExtension('OES_vertex_array_object');
    var building6Left = oes_vao_ext.createVertexArrayOES();
    oes_vao_ext.bindVertexArrayOES(building6Left);
    initBuffer("a_position",vertices,gl.SHADER_PROGRAM0);
    initBuffer("a_normal",normals,gl.SHADER_PROGRAM0);
    initBuffer("a_color",colors,gl.SHADER_PROGRAM0);
    // initArrayBuffer(triangleIndices);
    initArrayBuffer(indices);
    globalVar.threeD.data.building6Left = {vertexArray:building6Left,vertices,normals,colors,texture,indices,triangleIndices};
})()


(function (){
    let gl = globalVar.threeD.gl;

    //let sphere = globalVar.threeD.geometry.sphere;
    let initBuffer = globalVar.threeD.initBuffer;
    let initArrayBuffer = globalVar.threeD.initArrayBuffer;

    //[vertices,normals,colors,texture,indices] = globalVar.threeD.geometry.sphere(1,16,16);
    //[vertices,normals,colors,texture,indices] = globalVar.threeD.geometry.cube();
    let [vertices,normals,colors,texture,indices,triangleIndices] = globalVar.threeD.geometry.building1();


    // let buildingVertexArr = gl.createVertexArray();
    // let buildingVertexArr = gl.createVertexArrayOES();
    // gl.bindVertexArray(buildingVertexArr);
    var oes_vao_ext = gl.getExtension('OES_vertex_array_object');
    var buildingVertexArr = oes_vao_ext.createVertexArrayOES();
    oes_vao_ext.bindVertexArrayOES(buildingVertexArr);

    initBuffer("a_position",vertices,gl.SHADER_PROGRAM0);
    initBuffer("a_normal",normals,gl.SHADER_PROGRAM0);
    initBuffer("a_color",colors,gl.SHADER_PROGRAM0);
    // initArrayBuffer(triangleIndices);
    initArrayBuffer(indices);

    globalVar.threeD.data.building1 = {vertexArray:buildingVertexArr,vertices,normals,colors,texture,indices,triangleIndices};
})()


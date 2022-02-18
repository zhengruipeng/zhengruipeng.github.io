(function () {
    globalVar.threeD.shaders.push([]);
    //GLSL
    globalVar.threeD.shaders[1][0] = "\n" +
        "attribute vec4 a_position;\n" +
        "uniform mat4 u_change;\n" +
        "uniform mat4 u_global_change;\n"+
        "uniform vec4 a_color;\n" +
        "uniform mat4 u_perspective;\n" +
        "varying vec4 v_color;\n" +
        "void main(){\n" +
        "    gl_Position = u_perspective * u_global_change * u_change * a_position;\n" +
        "    v_color = a_color;\n" +
        "}";
})();
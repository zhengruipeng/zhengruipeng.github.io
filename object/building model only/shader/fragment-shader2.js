(function () {
    globalVar.threeD.shaders[1][1] = "#version 300 es\n" +
        "precision highp float;\n" +
        "in vec4 v_color;\n" +
        "out vec4 fragColor;\n" +
        "void main (){\n" +
        "    fragColor = v_color;\n" +
        "}";
})();
(function () {
    globalVar.threeD.shaders[1][1] = "" +
        "precision lowp float;\n" +
        "varying vec4 v_color;\n" +
        "void main (){\n" +
        "    gl_FragColor = v_color;\n" +
        "}";
})();
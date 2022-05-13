(function (){
    globalVar.threeD.shaders.push([]);
    //GLSL
    globalVar.threeD.shaders[0][0] = "\n" +
        "attribute vec4 a_position;\n" +
        "attribute vec4 a_normal;\n" +
        "attribute vec4 a_color;\n" +
        "uniform mat4 u_perspective;\n" +
        "uniform mat4 u_global_change;\n" +
        "uniform mat4 u_change;\n" +
        "uniform mat4 u_trans;\n" +
        "uniform mat4 u_global_trans;\n" +
        "uniform vec4 u_ambient;\n" +
        "uniform vec4 u_point_pos;\n" +
        "uniform vec4 u_point_color;\n" +
        "uniform vec4 u_perspective_pos;\n" +
        "uniform float u_reduction_a;\n" +
        "uniform float u_reduction_b;\n" +
        "uniform float u_reduction_c;\n" +
        "uniform float u_diffuse_intensity;\n" +
        "uniform float u_mirror_intensity;\n" +
        "uniform float u_diffuse_reflection;\n" +
        "uniform float u_mirror_reflection;\n" +
        "uniform float u_highLight;\n" +
        "varying vec4 v_position;\n" +
        "varying vec4 v_normal;\n" +
        "varying vec4 v_color;\n" +
        "varying vec4 v_ambient;\n" +
        "varying vec4 v_point_pos;\n" +
        "varying vec4 v_point_color;\n" +
        "varying float v_reduction_a;\n" +
        "varying float v_reduction_b;\n" +
        "varying float v_reduction_c;\n" +
        "varying float v_diffuse_intensity;\n" +
        "varying float v_mirror_intensity;\n" +
        "varying float v_diffuse_reflection;\n" +
        "varying float v_mirror_reflection;\n" +
        "varying float v_highLight;\n" +
        "varying vec4 v_perspective_pos;\n" +
        "varying mat4 v_trans;\n" +
        "varying mat4 v_global_trans;\n" +
        "    void main(){\n" +
        "        gl_Position = u_perspective * u_global_change * u_change * a_position;\n" +
        "        v_position = u_global_change * u_change * a_position;\n" +
        "        v_normal = a_normal;\n" +
        "        v_color = a_color;\n" +
        "        v_ambient = u_ambient;\n" +
        "        v_point_pos = u_point_pos;\n" +
        "        v_point_color = u_point_color;\n" +
        "        v_reduction_a = u_reduction_a;\n" +
        "        v_reduction_b = u_reduction_b;\n" +
        "        v_reduction_c = u_reduction_c;\n" +
        "        v_diffuse_intensity = u_diffuse_intensity;\n" +
        "        v_mirror_intensity = u_mirror_intensity;\n" +
        "        v_diffuse_reflection = u_diffuse_reflection;\n" +
        "        v_mirror_reflection = u_mirror_reflection;\n" +
        "        v_highLight = u_highLight;\n" +
        "        v_perspective_pos = u_perspective_pos;\n" +
        "        v_trans = u_trans;\n" +
        "        v_global_trans = u_global_trans;\n" +
        "    }";
})();
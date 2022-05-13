(function (){
    globalVar.threeD.shaders.push([]);
    //GLSL
    globalVar.threeD.shaders[0][0] = "#version 300 es\n" +
        "in vec4 a_position;\n" +
        "in vec4 a_normal;\n" +
        "in vec4 a_color;\n" +
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
        "out vec4 v_position;\n" +
        "out vec4 v_normal;\n" +
        "out vec4 v_color;\n" +
        "out vec4 v_ambient;\n" +
        "out vec4 v_point_pos;\n" +
        "out vec4 v_point_color;\n" +
        "out float v_reduction_a;\n" +
        "out float v_reduction_b;\n" +
        "out float v_reduction_c;\n" +
        "out float v_diffuse_intensity;\n" +
        "out float v_mirror_intensity;\n" +
        "out float v_diffuse_reflection;\n" +
        "out float v_mirror_reflection;\n" +
        "out float v_highLight;\n" +
        "out vec4 v_perspective_pos;\n" +
        "out mat4 v_trans;\n" +
        "out mat4 v_global_trans;\n" +
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
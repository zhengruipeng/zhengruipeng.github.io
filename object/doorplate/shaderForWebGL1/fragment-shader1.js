(function (){
    globalVar.threeD.shaders[0][1] = "" +
        "precision lowp float;\n" +
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
        "        vec3 normal = normalize(vec3(v_global_trans * v_trans * v_normal));\n" +
        "        vec3 point_pos = vec3(v_point_pos);\n" +
        "        vec3 position = vec3(v_position);\n" +
        "        vec3 point_relative_pos = point_pos - position;\n" +
        "        float length = length(point_relative_pos);\n" +
        "        vec3 halfangle = normalize(normalize(vec3(point_relative_pos))+normalize(vec3(v_perspective_pos - v_position)));\n" +
        "        float theta = max(dot(normalize(point_relative_pos),normalize(normal)),0.0);\n" +
        "        float reduction = 1.0/(v_reduction_a+v_reduction_b*length+v_reduction_c*length*length);\n" +
        "        float diffuse = v_diffuse_intensity * v_diffuse_reflection * theta;\n" +
        "        float mirror = v_mirror_intensity * v_mirror_reflection * max(pow(dot(normalize(normal),halfangle),v_highLight),0.0);\n" +
        "        float phong = reduction * (diffuse + mirror);\n" +
        "        vec3 point = vec3(v_point_color) * vec3(v_color) * phong;\n" +
        "        vec3 ambient = vec3(v_ambient) * vec3(v_color);\n" +
        "        gl_FragColor = vec4(ambient + point,1.0);\n" +
        "    }";
})()
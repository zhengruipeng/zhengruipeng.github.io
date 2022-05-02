(function (){
    globalVar.threeD.shaders[0][1] = "#version 300 es\n" +
        "precision lowp float;\n" +
        "in vec4 v_position;\n" +
        "in vec4 v_normal;\n" +
        "in vec4 v_color;\n" +
        "in vec4 v_ambient;\n" +
        "in vec4 v_point_pos;\n" +
        "in vec4 v_point_color;\n" +
        "in float v_reduction_a;\n" +
        "in float v_reduction_b;\n" +
        "in float v_reduction_c;\n" +
        "in float v_diffuse_intensity;\n" +
        "in float v_mirror_intensity;\n" +
        "in float v_diffuse_reflection;\n" +
        "in float v_mirror_reflection;\n" +
        "in float v_highLight;\n" +
        "in vec4 v_perspective_pos;\n" +
        "in mat4 v_trans;\n" +
        "in mat4 v_global_trans;\n" +
        "out vec4 fragColor;\n" +
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
        "        fragColor = vec4(ambient + point,1.0);\n" +
        "    }";
})()
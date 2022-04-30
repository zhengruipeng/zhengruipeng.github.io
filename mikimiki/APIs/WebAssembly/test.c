#version 300 es
in vec4 a_POSITION;
in vec3 a_NORMAL;
in vec4 a_WEIGHTS_0;
in uvec4 a_JOINTS_0;

uniform mat4 u_projection;
uniform mat4 u_view;
uniform mat4 u_world;
uniform sampler2D u_jointTexture;
uniform float u_numJoints;

out vec3 v_normal;

mat4 getBoneMatrix(uint jointNdx) {
    return mat4(
            texelFetch(u_jointTexture, ivec2(0, jointNdx), 0),
            texelFetch(u_jointTexture, ivec2(1, jointNdx), 0),
            texelFetch(u_jointTexture, ivec2(2, jointNdx), 0),
            texelFetch(u_jointTexture, ivec2(3, jointNdx), 0));
}

void main() {
    mat4 skinMatrix = getBoneMatrix(a_JOINTS_0[0]) * a_WEIGHTS_0[0] +
                      getBoneMatrix(a_JOINTS_0[1]) * a_WEIGHTS_0[1] +
                      getBoneMatrix(a_JOINTS_0[2]) * a_WEIGHTS_0[2] +
                      getBoneMatrix(a_JOINTS_0[3]) * a_WEIGHTS_0[3];
    mat4 world = u_world * skinMatrix;
    gl_Position = u_projection * u_view * world * a_POSITION;
    v_normal = mat3(world) * a_NORMAL;
}
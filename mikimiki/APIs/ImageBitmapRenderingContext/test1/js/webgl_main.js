let webgl;
(function (){
    let vertexShader = getFile.getFile("./shader/phone_vertex_shader");
    let fragmentShader = getFile.getFile("./shader/phone_fragment_shader");

    const SCREEN_WIDTH = document.documentElement.clientWidth;
    const SCREEN_HEIGHT = document.documentElement.clientHeight-3;

    webgl = new OffscreenCanvas(SCREEN_WIDTH,SCREEN_HEIGHT);

    let vertices = [],normals = [],indices = [],colors = [],texture = [];

    let gl = webgl.getContext("webgl2");
    let initShader = function (vertex,frag){
        let loadShader = function (text,type){
            let shader = gl.createShader(type);
            gl.shaderSource(shader,text);
            gl.compileShader(shader);
            return shader;
        };
        vertex = loadShader(vertex,gl.VERTEX_SHADER);
        frag = loadShader(frag,gl.FRAGMENT_SHADER);
        let program = gl.createProgram();
        gl.attachShader(program,vertex);
        gl.attachShader(program,frag);
        gl.linkProgram(program);
        return program;

    };
    let initBuffer = function (name,value,shader){
        let attribute = gl.getAttribLocation(shader,name);
        let buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,buf);
        gl.bufferData(gl.ARRAY_BUFFER,value,gl.STATIC_DRAW);
        gl.vertexAttribPointer(attribute,3,gl.FLOAT,false,0,0);
        gl.enableVertexAttribArray(attribute)
    };
    let initUniform = function (name,value,type,shader){
        let uniform = gl.getUniformLocation(shader,name);
        type.slice(0,1) === "M"?gl['uniform'+type](uniform,false,value):gl['uniform'+type](uniform,...value);

    };
    let drawSphere = function(radius,segmentX,segmentY) {
        let lats = segmentX,
            longs = segmentY;

        for (let latNumber = 0; latNumber <= lats; ++latNumber) {
            for (let longNumber = 0; longNumber <= longs; ++longNumber) {
                var u = longNumber / segmentX;
                var v = latNumber / segmentY;
                let theta = latNumber * Math.PI / lats;
                let phi = longNumber / longs * 2 * Math.PI ;
                let sinTheta = Math.sin(theta);
                let sinPhi = Math.sin(phi);
                let cosTheta = Math.cos(theta);
                let cosPhi = Math.cos(phi);
                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;
                // let s, t ,u;
                vertices.push(radius * x);
                vertices.push(radius * y);
                vertices.push(radius * z);
                normals.push(x);
                normals.push(y);
                normals.push(z);
                colors.push(1.0);
                colors.push(1.0);
                colors.push(1.0);
                texture.push(u);
                texture.push(1-v);
                texture.push(0);
            }
        }

        for (let latNumberI = 0; latNumberI < lats; ++latNumberI) {
            for (let longNumberI = 0; longNumberI < longs; ++longNumberI) {
                let first = (latNumberI * (longs+1)) + longNumberI;
                let second = first + longs + 1;
                indices.push(first);
                indices.push(second);
                indices.push(first+1);
                indices.push(second);
                indices.push(second+1);
                indices.push(first+1);
            }
        }
        vertices = new Float32Array(vertices);
        normals = new Float32Array(normals);
        colors = new Float32Array(colors);
        texture = new Float32Array(texture);
        indices = new Uint16Array(indices);
    };
    let initArrayBuffer = function (b){
        let buf = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,buf);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,b,gl.STATIC_DRAW);
    };
    let render = function (){
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);
        requestAnimationFrame(render);
    };

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0,0,0,1);
    // initShaders(gl,vertex.innerText,fragment.innerText);
    gl.SHADER_PROGRAM0 = initShader(vertexShader,fragmentShader);
    gl.useProgram(gl.SHADER_PROGRAM0);
    drawSphere(1,32,32);
    let perspective_pos = [0,0,5];
    let perspectiveMatrix = initPerspective(...perspective_pos,0,0,0,0,1,0,20,webgl.width/webgl.height,.1,1000);
    initBuffer("a_position",vertices,gl.SHADER_PROGRAM0);
    initBuffer("a_normal",normals,gl.SHADER_PROGRAM0);
    initBuffer("a_color",colors,gl.SHADER_PROGRAM0);
    initArrayBuffer(indices);
    initUniform("u_perspective",perspectiveMatrix,"Matrix4fv",gl.SHADER_PROGRAM0);
    initUniform("u_change",new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),"Matrix4fv",gl.SHADER_PROGRAM0);
    initUniform("u_ambient",[.2,.2,.2,1],"4f",gl.SHADER_PROGRAM0);
    initUniform("u_point_pos",[2,3,5,1],"4f",gl.SHADER_PROGRAM0);
    initUniform("u_point_color",[1,1,1,1],"4f",gl.SHADER_PROGRAM0);
    initUniform("u_reduction_a",[1],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_reduction_b",[1],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_reduction_c",[1],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_diffuse_intensity",[15],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_mirror_intensity",[15],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_diffuse_reflection",[1],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_mirror_reflection",[1],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_highLight",[100],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_perspective_pos",perspective_pos.concat([1]),"4f",gl.SHADER_PROGRAM0);
    render();
})()
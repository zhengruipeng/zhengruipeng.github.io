(() => {
    let canvas = document.querySelector("#canvas");
    canvas.width=document.documentElement.clientWidth;
    canvas.height=document.documentElement.clientHeight-4;
    let vertex,fragment;
    /*(async function (){
        Promise.all([
            new Promise(
                (res,rej) => {
                    getFile("./shaders/vertex_shader.txt",xhr => {
                        vertex = xhr.response;
                        res(vertex);
                    })
                }
            ),
            new Promise(
                (res,rej) => {
                    getFile("./shaders/fragment_shader.txt", xhr => {
                        fragment = xhr.response;
                        res(fragment);
                    })
                }
            ),
        ])
            .then( resarr => {
                gl.SHADER_PROGRAM0 = initShader(...resarr);
                gl.useProgram(gl.SHADER_PROGRAM0);
                console.log(vertex,fragment);
            });
    })();*/
    vertex = getFile("./shaders/vertex_shader.txt")
    fragment = getFile("./shaders/fragment_shader.txt");

    let gl = canvas.getContext("webgl");

    let vertices = [   // Vertex coordinates
        1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,  // v0-v1-v2-v3 front
        1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,  // v0-v3-v4-v5 right
        1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,  // v0-v5-v6-v1 up
        -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,  // v1-v6-v7-v2 left
        -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,  // v7-v4-v3-v2 down
        1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0   // v4-v7-v6-v5 back
    ];
    let texture_vertices = [
        1,1,1, 0,1,1, 0,0,1, 1,0,1,
        0,1,1, 0,0,1, 1,0,-1, 1,1,-1,
        1,1,1, 0,1,-1, 0,0,-1, 1,0,1,
        1,1,1, 0,1,-1, 0,0,-1, 1,0,1,
        1,1,-1, 0,1,-1, 0,0,1, 1,0,1,
        0,0,-1, 1,0,-1, 1,1,-1, 0,1,-1
    ];
    let normals = [
        0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0, // v0-v1-v2-v3 front
        1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0, // v0-v3-v4-v5 right
        0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0, // v0-v5-v6-v1 up
        -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
        0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0, // v7-v4-v3-v2 down
        0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0  // v4-v7-v6-v5 back
    ];
    let indices = [       // Indices of the vertices
        0, 1, 2,   0, 2, 3,    // front
        4, 5, 6,   4, 6, 7,    // right
        8, 9,10,   8,10,11,    // up
        12,13,14,  12,14,15,    // left
        16,17,18,  16,18,19,    // down
        20,21,22,  20,22,23     // back
    ];
    Math.cot = function (x){
        return 1/Math.tan(x);
    };
    let initUniform = function (name,value,type,shader){
        let uniform = gl.getUniformLocation(shader,name);
        type.substr(0,1) === "M"?gl["uniform"+type](uniform,false,value):gl["uniform"+type](uniform,...value);
    };
    let initShader = function (vertex,fragment){
        let loadShader =function (text,type){
            let shader = gl.createShader(type);
            gl.shaderSource(shader,text);
            gl.compileShader(shader);
            return shader;
        };
        let program = gl.createProgram();
        vertex = loadShader(vertex,gl.VERTEX_SHADER);
        fragment = loadShader(fragment,gl.FRAGMENT_SHADER);
        gl.attachShader(program,vertex);
        gl.attachShader(program,fragment);
        gl.linkProgram(program);
        return program;
    };
    let distance = function (arr){
        return Math.hypot(...arr);
    };
    let normal = function(arr1,arr2){
        return [
            arr1[1]*arr2[2]-arr2[1]*arr1[2],
            arr2[0]*arr1[2]-arr2[2]*arr1[0],
            arr2[1]*arr1[0]-arr2[0]*arr1[1],
        ];
    };
    let times = function(mat1 ,mat2) {
        var i, e, a, b, ai0, ai1, ai2, ai3;
        // Calculate e = a * b
        e = mat1;
        a = mat1;
        b = mat2;

        if (e === b) {
            b = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
                b[i] = e[i];
            }
        }

        for (i = 0; i < 4; i++) {
            ai0=a[i];  ai1=a[i+4];  ai2=a[i+8];  ai3=a[i+12];
            e[i]    = ai0 * b[0]  + ai1 * b[1]  + ai2 * b[2]  + ai3 * b[3];
            e[i+4]  = ai0 * b[4]  + ai1 * b[5]  + ai2 * b[6]  + ai3 * b[7];
            e[i+8]  = ai0 * b[8]  + ai1 * b[9]  + ai2 * b[10] + ai3 * b[11];
            e[i+12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }

        return mat1;
    };
    let normalize = function (vec){
        return distance(vec) !== 0?[vec[0]/distance(vec),vec[1]/distance(vec),vec[2]/distance(vec)]:[0,0,0];
    };
    let minus = function (vec1,vec2){
        return [vec2[0]-vec1[0],vec2[1]-vec1[1],vec2[2]-vec1[2]];
    };
    let translate = function(mat1,x, y, z){
        var e = mat1;
        e[12] += e[0] * x + e[4] * y + e[8]  * z;
        e[13] += e[1] * x + e[5] * y + e[9]  * z;
        e[14] += e[2] * x + e[6] * y + e[10] * z;
        e[15] += e[3] * x + e[7] * y + e[11] * z;
        return mat1;
    };
    let initPerspective = function (eyeX,eyeY,eyeZ,centerX,centerY,centerZ,topX,topY,topZ, fovy, ascept, near, far) {

        fovy = Math.PI/180*fovy;
        let perspective = new Float32Array([
            Math.cot(fovy)/ascept,0,0,0,
            0,Math.cot(fovy),0,0,
            0,0,-(near+far)/(far-near),-1,
            0,0,-(2*far*near)/(far-near),0
        ]);
        let fe = [eyeX,eyeY,eyeZ];
        let fc = [centerX,centerY,centerZ];
        let ft = [topX,topY,topZ];
        let fn = normalize(minus(fe,fc));          //z
        let fu = normalize(normal(fn,ft));        //x
        let fv = normalize(normal(fn,fu));        //y
        let lookAt = new Float32Array([
            fu[0],-fv[0],-fn[0],0,
            fu[1],-fv[1],-fn[1],0,
            fu[2],-fv[2],-fn[2],0,
            0,0,0,1
        ]);
        lookAt = translate(lookAt,-eyeX,-eyeY,-eyeZ);
        lookAt = times(perspective,lookAt);
        return lookAt;
    };
    let initBuffer = function (name,buffer,shader){
        let attribute = gl.getAttribLocation(shader,name);
        let buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,buf);
        gl.bufferData(gl.ARRAY_BUFFER,buffer,gl.STATIC_DRAW);
        gl.vertexAttribPointer(attribute,3,gl.FLOAT,false,0,0);
        gl.enableVertexAttribArray(attribute)
    };
    let initArrayBuffer = function (buffer){
        let buf = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,buf);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,buffer,gl.STATIC_DRAW);
    };
    let loadTexture = function (){
        let u_sampler = gl.getUniformLocation(gl.SHADER_PROGRAM0,"u_sampler"+this.name);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);
        let texture = gl.createTexture();
        gl.activeTexture(gl["TEXTURE"+this.name]);
        gl.bindTexture(gl.TEXTURE_2D,texture);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,this);
        gl.uniform1i(u_sampler,this.name);
        temp[this.name] = true;
        gl.clear(gl.COLOR_BUFFER_BIT);
        if(temp.every((e) => {return e===true;}))render();
    };
    let render = function (){
        theta+=Math.PI/180;
        point_pos[0] = Math.cos(theta)*5;
        point_pos[2] = Math.abs(Math.sin(theta)*5);
        initUniform("u_point_pos",point_pos.concat([1]),"4f",gl.SHADER_PROGRAM0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
        requestAnimationFrame(render);
    };
    gl.SHADER_PROGRAM0 = initShader(vertex,fragment);
    gl.useProgram(gl.SHADER_PROGRAM0);
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.enable(gl.DEPTH_TEST);
    let perspective_pos = [2*2/3,3*2/3,5*2/3];
    let theta = 0;
    let point_pos = [3,3,6];
    let perspective = initPerspective(...perspective_pos,0,0,0,0,1,0,20,canvas.width/canvas.height,.1,1000);
    initUniform("u_perspective",perspective,"Matrix4fv",gl.SHADER_PROGRAM0);
    initUniform("u_ambient",[.2,.2,.2,1],"4f",gl.SHADER_PROGRAM0);
    initUniform("u_point_pos",point_pos.concat([1]),"4f",gl.SHADER_PROGRAM0);
    initUniform("u_point_color",[1,1,1,1],"4f",gl.SHADER_PROGRAM0);
    initUniform("u_perspective_pos",perspective_pos.concat([1]),"4f",gl.SHADER_PROGRAM0);
    initUniform("u_perspective_pos",perspective_pos.concat([1]),"4f",gl.SHADER_PROGRAM0);
    initUniform("u_a",[.7],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_b",[.7],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_c",[.7],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_ld",[15],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_ls",[15],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_kd",[1],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_ks",[1],"1f",gl.SHADER_PROGRAM0);
    initUniform("u_alpha",[100],"1f",gl.SHADER_PROGRAM0);
    initBuffer("a_position",new Float32Array(vertices),gl.SHADER_PROGRAM0);
    initBuffer("a_normal",new Float32Array(normals),gl.SHADER_PROGRAM0);
    initBuffer("a_texture",new Float32Array(texture_vertices),gl.SHADER_PROGRAM0);
    initBuffer("objTangent",vertices,gl.SHADER_PROGRAM0);
    initArrayBuffer(new Uint16Array(indices));

    let temp = [false,false];
    let image1 = new Image();
    image1.src="./texture/plaster.jpg";
    image1.name = 0;
    image1.onload = loadTexture;
    let image2 = new Image();
    image2.src="./texture/plaster-normal.jpg";
    image2.name = 1;
    image2.onload = loadTexture;
})();

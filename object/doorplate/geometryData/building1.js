(function (){
    globalVar.threeD.geometry.building1 = function (){
        let f = globalVar.FH;
        let initIndices = function (num) {
            let arr = [];
            let n = 0;
            for (let i = 0; i < num; i++) {
                arr.push(n + 0);
                arr.push(n + 1);
                arr.push(n + 1);
                arr.push(n + 2);
                arr.push(n + 2);
                arr.push(n + 0);
                arr.push(n + 1);
                arr.push(n + 2);
                arr.push(n + 2);
                arr.push(n + 3);
                arr.push(n + 3);
                arr.push(n + 1);
                n += 4;
            }
            return new Uint16Array(arr);
        };
        let initTriangleIndices = function (num){
            let arr = [];
            let n = 0;
            for (let i = 0; i < num; i++) {
                arr.push(n + 0);
                arr.push(n + 1);
                arr.push(n + 2);
                arr.push(n + 1);
                arr.push(n + 2);
                arr.push(n + 3);
                n += 4;
            }
            return new Uint16Array(arr);
        };
        let initColors = function (num){
            let arr = [];
            for(let i = 0;i<num;i++){
                arr.push(0.3);
                arr.push(0.3);
                arr.push(1);
                arr.push(0.3);
                arr.push(0.3);
                arr.push(1);
                arr.push(0.3);
                arr.push(0.3);
                arr.push(1);
                arr.push(0.3);
                arr.push(0.3);
                arr.push(1);
            }
            return new Float32Array(arr);
        }
        //综合实验楼
        let vertices = new Float32Array([
            //front
            18,3*f,17, 9.2,3*f,17, 18,0,17, 9.2,0,17,
            9.2,3*f,17, 9.2,3*f,24.12, 9.2,0,17, 9.2,0,24.12,
            9.2,3*f,24.12,  -9.2,3*f,24.12,  9.2,0,24.12, -9.2,0,24.12,
            -9.2,3*f,24.12, -9.2,3*f,17,  -9.2,0,24.12, -9.2,0,17,
            -9.2,3*f,17, -18,3*f,17, -9.2,0,17, -18,0,17,

            //midleft
            -18,3*f,17, -18,3*f,-17, -18,0,17, -18,0,-17,

            //back
            -18,3*f,-17, -9.2,3*f,-17, -18,0,-17, -9.2,0,-17,
            -9.2,3*f,-17,  -9.2,3*f,-24.12, -9.2,0,-17,  -9.2,0,-24.12,
            -9.2,3*f,-24.12,  9.2,3*f,-24.12,  -9.2,0,-24.12,  9.2,0,-24.12,
            9.2,3*f,-24.12, 9.2,3*f,-17, 9.2,0,-24.12,  9.2,0,-17,
            9.2,3*f,-17, 18,3*f,-17, 9.2,0,-17,  18,0,-17,

            //midright
            18,3*f,-17, 18,3*f,17, 18,0,-17,  18,0,17,

            //top
            -9.2,3*f,-24.12,  9.2,3*f,-24.12, -9.2,3*f,-17, 9.2,3*f,-17,
            -18,3*f,-17,  18,3*f,-17,  -18,3*f,17,  18,3*f,17,
            -9.2,3*f,24.12,  9.2,3*f,24.12, -9.2,3*f,17, 9.2,3*f,17,
        ]);
        let indices = initIndices(15);
        let colors = initColors(15);
        let texture = new Float32Array();
        let normals = new Float32Array([
            0,0,1, 0,0,1, 0,0,1, 0,0,1,
            1,0,0, 1,0,0, 1,0,0, 1,0,0,
            0,0,1, 0,0,1, 0,0,1, 0,0,1,
            -1,0,0, -1,0,0, -1,0,0, -1,0,0,
            0,0,1, 0,0,1, 0,0,1, 0,0,1,

            -1,0,0, -1,0,0, -1,0,0, -1,0,0,

            0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
            -1,0,0, -1,0,0, -1,0,0, -1,0,0,
            0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
            1,0,0, 1,0,0, 1,0,0, 1,0,0,
            0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,

            1,0,0, 1,0,0, 1,0,0, 1,0,0,

            0,1,0, 0,1,0, 0,1,0, 0,1,0,
            0,1,0, 0,1,0, 0,1,0, 0,1,0,
            0,1,0, 0,1,0, 0,1,0, 0,1,0,

        ]);
        let triangleI = initTriangleIndices(15)
        return [vertices,normals,colors,texture,indices,triangleI];
    };
})()
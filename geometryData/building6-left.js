(function (){
    globalVar.threeD.geometry.building6Left = function (){
        let f = globalVar.FH;
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
        let initColors = function (num){
            let arr = [];
            for(let i = 0;i<num;i++){
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
                arr.push(0.3);
            }
            return new Float32Array(arr);
        }
        //综合实验楼
        let vertices = new Float32Array([
            0,4*f,14.29, -6.58,4*f,14.29, 0,0,14.29, -6.58,0,14.29,
            -6.58,4*f,14.29,  -6.58,4*f,12.83, -6.58,0,14.29,  -6.58,0,12.83,
            -6.58,4*f,12.83,  -12.24,4*f,12.83,  -6.58,0,12.83,  -12.24,0,12.83,
            -12.24,4*f,12.83,  -12.24,4*f,10.46,  -12.24,0,12.83,  -12.24,0,10.46,
            -12.24 ,4*f ,10.46,  -17.95 ,4*f ,10.46,  -12.24 ,0 ,10.46,  -17.95,0,10.46,

            -17.95,4*f,10.46,  -17.95,4*f,-10.45,  -17.95,0,10.46,  -17.95,0,-10.45,
            -17.95,4*f,-10.45,  -8.57,4*f,-10.45,  -17.95,0,-10.45,  -8.57,0,-10.45,

            // -8.57,4*f,-10.45,  -8.57,4*f,-10.45,  -8.57,0,-10.45,  -8.57,0,-10.45,
            -8.57,4*f,-10.45,  -8.57,4*f,-14.29,  -8.57,0,-10.45,  -8.57,0,-14.29,
            -8.57,4*f,-14.29,  0,4*f,-14.29,  -8.57,0,-14.29,  0,0,-14.29,
            0,4*f,-14.29,  0,4*f,14.29,  0,0,-14.29,  0,0,14.29,

            //top
            0,4*f,-14.29, -8.57,4*f,-14.29, 0,4*f,-10.45, -8.57,4*f,-10.45,
            0,4*f,-10.45, -17.95,4*f,-10.45,  0,4*f,10.46,  -17.95,4*f,10.46,
            0,4*f,10.46,  -12.24,4*f,10.46,  0,4*f,12.83,  -12.24,4*f,12.83,
            0,4*f,12.83,  -6.58,4*f,12.83,  0,4*f,14.29,  -6.58,4*f,14.29,
        ]);
        let indices = initIndices(15);
        let colors = initColors(15);
        let texture = new Float32Array();
        let triangleI = initTriangleIndices(15);
        let normals = new Float32Array([
            0,0,1, 0,0,1, 0,0,1, 0,0,1,
            -1,0,0, -1,0,0, -1,0,0, -1,0,0,
            0,0,1, 0,0,1, 0,0,1, 0,0,1,
            -1,0,0, -1,0,0, -1,0,0, -1,0,0,
            0,0,1, 0,0,1, 0,0,1, 0,0,1,

            -1,0,0, -1,0,0, -1,0,0, -1,0,0,
            0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
            -1,0,0, -1,0,0, -1,0,0, -1,0,0,
            0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
            1,0,0, 1,0,0, 1,0,0, 1,0,0,

            //TOP
            0,1,0, 0,1,0, 0,1,0, 0,1,0,
            0,1,0, 0,1,0, 0,1,0, 0,1,0,
            0,1,0, 0,1,0, 0,1,0, 0,1,0,
            0,1,0, 0,1,0, 0,1,0, 0,1,0,
        ]);
        return [vertices,normals,colors,texture,indices,triangleI];
    };
})()
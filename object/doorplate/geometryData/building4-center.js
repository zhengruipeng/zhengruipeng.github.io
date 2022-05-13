(function (){
    globalVar.threeD.geometry.building4Center = function () {
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

        let initColors = function (num) {
            let arr = [];
            for (let i = 0; i < num; i++) {
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
        let vertices = new Float32Array([
            47.33, 5*f, 8.55, -47.33, 5*f, 8.55, 47.33, 0, 8.55, -47.33, 0, 8.55,
            -47.33, 5*f, 8.55, -47.33, 5*f, -8.55, -47.33, 0, 8.55, -47.33, 0, -8.55,
            -47.33, 5*f, -8.55, 47.33, 5*f, -8.55, -47.33, 0, -8.55, 47.33, 0, -8.55,
            47.33, 5*f, -8.55, 47.33, 5*f, 8.55, 47.33, 0, -8.55, 47.33, 0, 8.55,

            //top
            47.33, 5*f, -8.55, -47.33, 5*f, -8.55, 47.33, 5*f, 8.55, -47.33, 5*f, 8.55,

            //bottom
            47.33, 0, -8.55, -47.33, 0, -8.55, 47.33, 0, 8.55, -47.33, 0, 8.55,

        ]);
        let normals = new Float32Array([
            0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
            -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
            0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,

            0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,

            0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,

        ]);
        let indices = initIndices(6);
        let colors = initColors(6);
        let triangleI = initTriangleIndices(6);
        let texture = new Float32Array();
        return [vertices, normals, colors, texture, indices,triangleI];
    }
})();
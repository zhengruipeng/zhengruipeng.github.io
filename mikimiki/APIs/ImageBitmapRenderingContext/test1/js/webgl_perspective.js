Math.cot = function (x){
    return 1/Math.tan(x);
};
let initPerspective;
(function (){
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
    initPerspective = function (eyeX,eyeY,eyeZ,centerX,centerY,centerZ,topX,topY,topZ, fovy, ascept, near, far) {
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
})();

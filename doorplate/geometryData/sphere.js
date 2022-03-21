(function (){
    let drawSphere = function(radius,segmentX,segmentY) {
        let vertices=[],
            normals = [],
            colors = [],
            texture = [],
            indices = [];
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
                colors.push(0);
                colors.push(0);
                colors.push(0.9);
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
        return [vertices,normals,colors,texture,indices];
    };
    globalVar.threeD.geometry.sphere = drawSphere;
})()
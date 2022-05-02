let Physics = function (G){
    var G = G||6.672e-11;
    let ug = function (m,M,r){
        if(arguments.length===1)var {m,M,r} = m;
        return [G*M*m/(Math.pow(r,2)),"N"];
    };
    let cf = function (m,v,r){
        if(arguments.length===1)var {m,v,r} = m;
        return [m*Math.pow(v,2)/r,"N"];
    };
    let ea = function (m,r){
        if(arguments.length===1)var {m,r} = m;
        return [G*m/Math.pow(r,2),"m/s^2"];
    };
    let av = function (a,v0,t){
        if(arguments.length===1){var {a,v0,t} = a;}
        return [v0+a*t,"m/s"];
    };
    let vx = function (v,v0,t){
        if(arguments.length===1){var {v0,t,v} = v;}
        return [(v0+v)/2*t,"m"];
    };
    let vx2 = function (v0,a,v){
        if(arguments.length===1){var {v0,t,v} = v0;}
        return [(Math.pow(v,2)-Math.pow(v0,2))/2*a,"m"];
    };
    let dv = function (v0,v){
        if(arguments.length===1){var {v0,v} = v0;}
        return [v-v0,"m/s"];
    };
    let xv = function (x,t){
        if(arguments.length===1){var {x,t} = x;}
        return [x/t,"m/s"];
    };
    let f = function (u,g){
        if(arguments.length===1){var {u,g} = u;}
        return [u*g,"N"];
    };
    let Sa = function (M,r){
        if(arguments.length===1){var {M,r} = M;}
        return [G*M/Math.pow(r,2),"m/s^2"];
    };
    let fa = function (f,m){
        if(arguments.length===1){var {m,f} = f;}
        return [f/m,"m/s^2"];
    };
    let pm = function (p,v){
        if(arguments.length===1){var {p,v} = p;}
        return [p*v,"m/s^2"];
    };

    if(this === window){
        return {
            "ug.":ug,
            "cf.":cf,
            "ea.":ea,
            "a->v":av,
            "v->x":vx,
            "v->x(a)":vx2,
            "DeltaV":dv,
            "x->v":xv,
            "f":f,
            "a(Space)":Sa,
            "f->a":fa,
            "p->m":pm
        }
    }else{
        this.prototype = {};
        this["ug."] = ug;
        this["cf."] = cf;
        this["ea."] = ea;
        this["a->v"] = av;
        this["v->x"] = vx;
        this["v->x(a)"] = vx2;
        this["DeltaV"] = dv;
        this["x->v"] = xv;
        this["f"] = f;
        this["a(Space)"] = Sa;
        this["f->a"] = fa;
        this["p->m"] = pm;
    }


};
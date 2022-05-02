let Complex_base = class {
    constructor (r,i){
        this.value = [r,i];
    };
    toString(){
        return this.value[0]+"+i*"+this.value[1];
    };
    geometry(){
        return this.value;
    };
    re(){
        return this.value[0];
    };
    im(){
        return this.value[1];
    };
    arg(){
        return Math.atan(this.value[1]/this.value[0]);
    };
    length(){
        return Math.hypot(this.value[0],this.value[1]);
    };
    euler(){
        return this.length()*Math.E**(new Complex_operation(0,1).minus(new Complex_operation(this.arg(),0)).length());
    };
};
let Complex_operation = class extends Complex_base{
    plus (z){
        return new  Complex_operation(this.value[0]+z.value[0],this.value[1]+z.value[1]);
    };
    minus(z){
        return new  Complex_operation(this.value[0]-z.value[0],this.value[1]-z.value[1]);
    };
    times(z){
        return new  Complex_operation(this.value[0]*z.value[0]-this.value[1]*z.value[1],this.value[0]*z.value[1]+this.value[0]*z.value[1]);
    };
    divides(z){
        return new  Complex_operation((this.value[0]*z.value[0]+this.value[1]*z.value[1])/(z.value[1]**2+z.value[0]**2),(z.value[0]*this.value[1]-this.value[0]*z.value[1])/(z.value[0]**2+z.value[1]**2));
    };
    conjugate(){            //共轭
        return new  Complex_operation(this.value[0],-this.value[1]);
    };
};
let Quaternion = class extends Complex_operation{
    toString(){
        return this.value[0]+"+i*"+this.value[1][0]+"+j*"+this.value[1][1]+"+k*"+this.value[1][2];
    };
    geometry(){
        return null;
    };
    arg(){
        return null;
    };
    length(){
        return Math.hypot(this.value[0],...this.value[1]);
    };
};
class CheckRange{
    public constructor(private start:number,private end:number) {}
    public inRange(num:number|string){
        if(typeof num === "string"){
            num = parseFloat(num);
        }
        if(num > this.start && num < this.end )
            return true;
        return false;
    }
}
let range = new CheckRange(1,10);
console.log(range.inRange("5"));
console.log(range.inRange("11"));
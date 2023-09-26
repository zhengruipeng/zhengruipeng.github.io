export class ResultData{
	private code:number;
	private data:any;
	private msg:string;
	constructor(code:number,data:any,msg:string) {
	    this.code = code;
			this.data = data;
			this.msg = msg;
	}
	public static end(code:number,data:any,msg:string):ResultData{
		return new ResultData(code,data,msg)
	}
	get getData(){
		return this.data;
	}
}
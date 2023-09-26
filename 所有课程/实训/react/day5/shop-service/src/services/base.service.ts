import { ResultData } from '../utils/ResultData'
import * as fs from 'fs'
import * as path from 'path'
import * as jwt from 'jsonwebtoken';
import {FileType} from '../entity/file.entity'
export class BaseService {
	
	getAdminUserByToken(token):any{
		let t = token.replace('Bearer','').trim();
		let res = jwt.verify(t,'shop-service')
		return res
	}
	
	findAll(tableName:string):ResultData{
		let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/${tableName}.table.json`))
		let list:Array<object> = JSON.parse(res.toString()).data;
		return ResultData.end(200,{list},"查询成功")
	}
	
	findAllByExample(tableName:string,fn:Function):ResultData{
		let list:Array<object> = fn();
		return ResultData.end(200,{list},"查询成功")
	}
	
	findById(id:string,tableName:string):ResultData{
		let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/${tableName}.table.json`))
		let list:Array<object> = JSON.parse(res.toString()).data;
		let obj:any = list.filter((item:any) => item.id == id )
		if(obj.length>0){
			return ResultData.end(200,obj[0],"查询成功")
		}else{
			return ResultData.end(500,{},"暂无数据")
		}
	}
	insertOne(item:any,tableName:string):ResultData{
		let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/${tableName}.table.json`))
		let baseData = JSON.parse(res.toString());
		item.id = new Date().getTime();
		baseData.data.push(item)
		fs.writeFileSync(path.resolve(__dirname,`../../src/tables/${tableName}.table.json`),JSON.stringify(baseData))
		return ResultData.end(200,item,"新增成功");
	}
	updateOne(item:any,tableName:string):ResultData{
		if(item.id){
			let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/${tableName}.table.json`))
			let baseData = JSON.parse(res.toString());
			baseData.data.forEach((dataItem:any)=>{
				if(dataItem.id == item.id){
					for(let key in item){
						dataItem[key] = item[key]
					}
				}
			})
			fs.writeFileSync(path.resolve(__dirname,`../../src/tables/${tableName}.table.json`),JSON.stringify(baseData))
			return ResultData.end(200,item,"修改成功");
		}else{
			return ResultData.end(500,{},"对象id不存在");
		}
	}
	findForPage(pno:number = 1,psize:number = 10,tableName:string,fn:Function):ResultData{
		let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/${tableName}.table.json`))
		let baseData:any;
		if(fn){
			baseData = fn();
		}else{
			baseData = JSON.parse(res.toString()).data
		}
		let totalElements:number = baseData.length;
		let hasPageLast:number = totalElements%psize == 0?0:1
		let pCount:number = Math.floor(totalElements/psize)+hasPageLast;
		let begin = Number((pno-1)*psize)
		let end = Number((pno-1)*psize)+Number(psize)
		let list = baseData.slice(begin,end);
		let page = {
			pno:Number(pno),psize:Number(psize),
			totalElements,
			pCount
		}
		if(list.length>0){
			if(pno<1){
				return ResultData.end(500,{list,page},"页号不能小于1");
			}else if(pno>pCount){
				return ResultData.end(500,{list,page},"页号不能超过页数字");
			}else{
				return ResultData.end(200,{list,page},"查询成功");
			}
		}else{
			return ResultData.end(200,{list,page},"查询成功");
		}
		
	}
	deleteById(id:string,tableName){
		try{
			let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/${tableName}.table.json`))
			let baseData = JSON.parse(res.toString());
			for(let i = 0 ;i<baseData.data.length;i++){
				if(id == baseData.data[i].id){
					baseData.data.splice(i,1)
				}
			}
			fs.writeFileSync(path.resolve(__dirname,`../../src/tables/${tableName}.table.json`),JSON.stringify(baseData))
			return ResultData.end(200,{},"删除成功");
		}catch(e){
			return ResultData.end(500,e.message,"删除失败");
		}
	}
	deleteByIds(ids:Array<any>,tableName){
		try{
			let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/${tableName}.table.json`))
			let baseData = JSON.parse(res.toString());
			baseData.data = baseData.data.filter(item => {
				if(ids.indexOf(item.id)==-1){
					return true
				}else{
					return false
				}
			})
			fs.writeFileSync(path.resolve(__dirname,`../../src/tables/${tableName}.table.json`),JSON.stringify(baseData))
			return ResultData.end(200,{},"删除成功");
		}catch(e){
			return ResultData.end(500,e.message,"删除失败");
		}
	}
	upload(file:any,body:FileType):ResultData{
		console.log(file.originalname)
		if(!file){
			return ResultData.end(500,{},'请上传一个文件')
		}
		if(body.folder){
			try{
				fs.accessSync(path.resolve(__dirname,'../../public/'+body.folder),fs.constants.R_OK | fs.constants.W_OK)
			}catch(e){
				console.log(e)
				fs.mkdirSync(path.resolve(__dirname,'../../public/'+body.folder))
			}
		}
		console.log(file.originalname)
		let houzhui = file.originalname.split('.')[file.originalname.split('.').length-1]
		let newFileName = Math.random().toString(36).slice(-6)+new Date().getTime()
		let filePath = '/public/'+(body.folder||'face')+'/'+newFileName+'.'+houzhui
		try{
			fs.writeFileSync(path.resolve(__dirname,'../..'+filePath),
				file.buffer)
		}catch(e){
			return ResultData.end(500,e.message,'上传失败')
		}
		return ResultData.end(200,{ url:filePath,fileName:newFileName+'.'+houzhui },'上传成功')
	}
	deleteFile(p:string):ResultData{
		try{
			fs.accessSync(path.resolve(__dirname,'../..'+p),fs.constants.R_OK | fs.constants.W_OK)
			fs.unlinkSync(path.resolve(__dirname,'../..'+p))
			return ResultData.end(200,{  },'删除成功')
		}catch(e){
			return ResultData.end(500,e.message,'删除失败')
		}
	}
}
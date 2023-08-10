import { Injectable } from '@nestjs/common';
import { ResultData} from '../utils/ResultData';
import * as fs from 'fs';
import * as path from 'path';
import { BaseService } from './base.service';
@Injectable()
export class DeptService extends BaseService {
	findForPageByExample(pno:number,psize:number,
		name:string = '',tableName:string):ResultData{
		return this.findForPage(pno,psize,tableName,() => {
			let res:ResultData = this.findAll(tableName)
			let goodsTypeList = this.findAll('goods-type').getData.list
			let arr:Array<any> = res.getData.list;
			if(name.trim().length>0){
				arr = arr.filter(item => {
					return item.name.indexOf(name)!=-1
				})
			}
			return arr;
		})
	}
	findDeptAndUser():ResultData{
		let deptList = this.findAll('dept').getData.list
		let userList = this.findAll('user').getData.list
		let arr = deptList.map(item => {
			let userListNew = userList.filter(itemUser => {
				if(item.id == itemUser.deptId){
					return true
				}else{
					return false
				}
			})
			item.children = userListNew
			return item
		})
		// console.log(deptList)
		return ResultData.end(200,arr,'查询成功')
	}
	deleteDeptUser(id:string,tableName:string):ResultData{
		try{
			// console.log(id)
			let user = this.findById(id,'user').getData
			// console.log(user)
			if(user.deptId == undefined||user.deptId==''){
				return ResultData.end(500,{},'该员工已被移除')
			}
			user.deptId = ''
			this.updateOne(user,'user')
		}catch(e){
			return ResultData.end(500,{},e.toString())
		}
		return ResultData.end(200,{},'移除成功')
	}
	addUser(ids:Array<any>,id:string,tableName:string):ResultData{
		
		// console.log(ids)
		let userList = this.findAll('user').getData.list
		// console.log(userList)
		userList.forEach(item => {
			if(item.deptId == id){
				item.deptId = ''
				this.updateOne(item,'user')
			}
			if(ids.indexOf(item.id+'')!= -1){
				item.deptId = id
				this.updateOne(item,'user')
			}
			
		})
		return ResultData.end(200,{},'加入成功')
	}
}

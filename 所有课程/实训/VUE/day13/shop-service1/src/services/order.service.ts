import { Injectable } from '@nestjs/common';
import { ResultData} from '../utils/ResultData';
import * as fs from 'fs';
import * as path from 'path';
import { BaseService } from './base.service';
import {Order} from '../entity/order.entity'
@Injectable()
export class OrderService extends BaseService {
	findForPageByExample(pno:number,psize:number,
		phone:string = '',
		status:number,tableName:string):ResultData{
		return this.findForPage(pno,psize,tableName,() => {
			let res:ResultData = this.findAll(tableName)
			let arr:Array<any> = res.getData.list;
			if(phone.trim().length>0){
				arr = arr.filter(item => {
					return item.phone.indexOf(phone)!=-1
				})
			}
			if(status){
				arr = arr.filter(item => {
					return item.status == status
				})
			}
			return arr.sort((a,b) => b.insertTime - a.insertTime);
		})
	}
	insert(order:Order,token:any,tableName:string):ResultData{
		let userInfo = this.getAdminUserByToken(token)
		if(userInfo){
			if(userInfo.password!= order.password){
				return ResultData.end(500,{},'密码错误')
			}
			
			let obj = {
				...order,
				id:new Date().getTime(),
				orderNo:'DD-'+new Date().getTime(),
				userId:userInfo.id,
				phone:userInfo.phone,
				nickname:userInfo.nickname,
				status:1
			}
			return this.insertOne(obj,'order')
		}
		return ResultData.end(500,{},'创建订单失败')
	}
	send(id:string,postCode:string,tableName:string):ResultData{
		let obj = this.findById(id,tableName).getData
		obj.status = 2;
		obj.postCode = postCode
		return this.updateOne(obj,tableName)
	}
	recive(id:string,tableName:string):ResultData{
		let obj = this.findById(id,tableName).getData
		obj.status = 3;
		return this.updateOne(obj,tableName)
	}
}

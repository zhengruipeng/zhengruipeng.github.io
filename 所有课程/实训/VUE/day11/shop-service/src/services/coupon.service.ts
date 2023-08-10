import { Injectable } from '@nestjs/common';
import { ResultData} from '../utils/ResultData';
import * as fs from 'fs';
import * as path from 'path';
import { BaseService } from './base.service';
import { Coupon } from '../entity/coupon.entity'
import { CouponMultiple } from '../entity/coupon-multiple.entity'
@Injectable()
export class CouponService extends BaseService {
	findForPageByExample(pno:number,psize:number,
		name:string = '',
		couponTypeId:number,tableName:string):ResultData{
		return this.findForPage(pno,psize,tableName,() => {
			let res:ResultData = this.findAll(tableName)
			let CouponTypeList = this.findAll('coupon-type').getData.list
			let arr:Array<any> = res.getData.list;
			if(name.trim().length>0){
				arr = arr.filter(item => {
					return item.name.indexOf(name)!=-1
				})
			}
			if(couponTypeId){
				arr = arr.filter(item => {
					return item.couponTypeId == couponTypeId
				})
			}
			arr = arr.map(item => {
				let arr = CouponTypeList.filter(itemType => {
					return itemType.id == item.couponTypeId
				})
				if(arr.length>0){
					item.couponTypeName = arr[0].name
				}
				return item;
			})
			return arr;
		})
	}
	insertMultiple(couponMultiple:CouponMultiple):ResultData{
		let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/coupon.table.json`))
		let baseData = JSON.parse(res.toString());
		
		
		let arrRes = []
		for(let i = 0 ;i < couponMultiple.count ; i++){
			arrRes.push({
				id:new Date().getTime()+''+i,
				name:couponMultiple.name,
				price:couponMultiple.price,
				targetTime:couponMultiple.targetTime,
				totalPrice:couponMultiple.totalPrice,
				couponTypeId:couponMultiple.couponTypeId,
				status:0,
				insertTime:new Date().getTime(),
				remark:couponMultiple.remark
			})
		}
		baseData.data = [...baseData.data,...arrRes]
		fs.writeFileSync(path.resolve(__dirname,`../../src/tables/coupon.table.json`),JSON.stringify(baseData))
		return ResultData.end(200,{},"新增成功");
	}
	
	
}

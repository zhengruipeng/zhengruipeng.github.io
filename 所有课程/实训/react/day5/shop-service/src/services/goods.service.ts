import { Injectable } from '@nestjs/common';
import { ResultData} from '../utils/ResultData';
import * as fs from 'fs';
import * as path from 'path';
import { BaseService } from './base.service';
@Injectable()
export class GoodsService extends BaseService {
	findForPageByExample(pno:number,psize:number,
		name:string = '',
		isOnSale:number,
		goodsTypeId:number,tableName:string):ResultData{
		return this.findForPage(pno,psize,tableName,() => {
			let res:ResultData = this.findAll(tableName)
			let goodsTypeList = this.findAll('goods-type').getData.list
			let arr:Array<any> = res.getData.list;
			if(name.trim().length>0){
				arr = arr.filter(item => {
					return item.name.indexOf(name)!=-1
				})
			}
			if(isOnSale){
				arr = arr.filter(item => {
					return item.isOnSale == isOnSale
				})
			}
			if(goodsTypeId){
				arr = arr.filter(item => {
					return item.goodsTypeId == goodsTypeId
				})
			}
			arr = arr.map(item => {
				let arr = goodsTypeList.filter(itemType => {
					return itemType.id == item.goodsTypeId
				})
				if(arr.length>0){
					item.goodsTypeName = arr[0].name
				}
				return item;
			})
			return arr;
		})
	}
	setOnSale(id:string,isOnSale:number,tableName:string):ResultData{
		let goods = this.findById(id,tableName).getData
		goods.isOnSale = isOnSale
		return this.updateOne(goods,tableName)
	}
}

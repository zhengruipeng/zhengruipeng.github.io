import { Injectable } from '@nestjs/common';
import { ResultData} from '../utils/ResultData';
import * as fs from 'fs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
console.log(jwt)
import { BaseService } from './base.service';
@Injectable()
export class ShopUserService extends BaseService {
	findForPageByExample(pno:number,psize:number,
		username:string = '',
		phone:string = '',
		freeze:number,
		beginTime:string,
		endTime:string,
		hasCard:number,tableName:string):ResultData{
		return this.findForPage(pno,psize,tableName,() => {
			let res:ResultData = this.findAll(tableName)
			let userTypeList = this.findAll('user-type').getData.list
			let arr:Array<any> = res.getData.list;
			if(username.trim().length>0){
				arr = arr.filter(item => {
					return item.username.indexOf(username)!=-1
				})
			}
			if(phone.trim().length>0){
				arr = arr.filter(item => {
					return item.phone.indexOf(phone)!=-1
				})
			}
			if(freeze){
				arr = arr.filter(item => {
					return item.freeze == freeze
				})
			}
			if(beginTime.trim().length>0){
				arr = arr.filter(item => {
					return item.birthday >= new Date(beginTime+' 00:00:00').getTime()
				})
			}
			if(endTime.trim().length>0){
				arr = arr.filter(item => {
					return item.birthday <= new Date(endTime+' 23:59:59').getTime()
				})
			}
			if(hasCard){
				if(hasCard == 1){
					arr = arr.filter(item => {
						return item.cardNumber !=undefined&&item.cardNumber.trim().length>0
					})
				}else if(hasCard == 0){
					arr = arr.filter(item => {
						return item.cardNumber ==undefined || item.cardNumber == ''
					})
				}
			}
			arr = arr.map(item => {
				let arr = userTypeList.filter(itemType => {
					return itemType.id == item.userTypeId
				})
				if(arr.length>0){
					item.userTypeName = arr[0].name
				}
				return item;
			})
			return arr;
		})
	}
	setFreeze(id:string,freeze:number,tableName:string):ResultData{
		let shopUser = this.findById(id,tableName).getData
		shopUser.freeze = freeze
		return this.updateOne(shopUser,tableName)
	}
	addLike(id:string,token:any):ResultData{
		let tokenInfo = this.getAdminUserByToken(token)
		let likeList = this.findAll('shop-user-like').getData.list;
		
		if(tokenInfo){
			let userId = tokenInfo.id;
			let arr = likeList.filter(item => item.goodsId == id&&userId == item.userId)
			if(arr.length>0){
				return ResultData.end(500,{},'已经收藏过该商品')
			}
			return this.insertOne({
				id:new Date().getTime(),
				userId,
				goodsId:id
			},'shop-user-like')
		}
		return ResultData.end(500,{},'收藏失败')
	}
	deleteLike(id:string,token:any):ResultData{
		let tokenInfo = this.getAdminUserByToken(token)
		let likeList = this.findAll('shop-user-like').getData.list;
		if(tokenInfo){
			let userId = tokenInfo.id;
			let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/shop-user-like.table.json`))
			let baseData = JSON.parse(res.toString());
			for(let i = 0 ;i<baseData.data.length;i++){
				if(id == baseData.data[i].goodsId && userId == baseData.data[i].userId){
					baseData.data.splice(i,1)
				}
			}
			fs.writeFileSync(path.resolve(__dirname,`../../src/tables/shop-user-like.table.json`),JSON.stringify(baseData))
			return ResultData.end(200,{},"删除成功");
		}
		return ResultData.end(500,{},'收藏失败')
	}
	getLikeList(pno:number = 1,psize:number = 10,token:any):ResultData{
		let tokenInfo = this.getAdminUserByToken(token)
		if(tokenInfo){
			let userId = tokenInfo.id;
			let likeList = this.findAll('shop-user-like').getData.list;
			let goodsArr = likeList.filter(item => item.userId == userId).map(item => {
				return item.goodsId
			})
			let goodsList = this.findAll('goods').getData.list;
			console.log(goodsArr,goodsList)
			let arr = goodsList.filter(item => {
				return goodsArr.indexOf(item.id)!= -1;
			})
			return this.findForPage(pno,psize,'shop-user-like',() => arr);
		}
		return ResultData.end(500,{},'获取失败')
	}
}

import { Injectable } from '@nestjs/common';
import { ResultData} from '../utils/ResultData';
import { BaseService } from './base.service'
import * as fs from 'fs';
import * as path from 'path'

@Injectable()
export class CheckOutService extends BaseService {
  getCheckOutPosition():ResultData{
		return this.findById('001','check-out-position')
	}
	check(lat1:number, lng1:number, lat2:number, lng2:number):number{
		var radLat1 = lat1*Math.PI / 180.0;
		var radLat2 = lat2*Math.PI / 180.0;
		var a = radLat1 - radLat2;
		var b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
		var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
		Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
		s = s *6378.137 ;// EARTH_RADIUS;
		s = Math.round(s * 10000) / 10000;
		return s;
	}
	checkInOrOut(lat:number,lng:number):ResultData{
		let checkOut = this.findById('001','check-out-position').getData
		let lat1 = checkOut.lat
		let lng1 = checkOut.lng
		let r = checkOut.r
		let r1 = this.check(lat,lng,lat1,lng1)
		if(r>=r1){
			return ResultData.end(200,{...checkOut},"在范围内")
		}else{
			return ResultData.end(500,{...checkOut},"不在范围内")
		}
		
	}
	checkIn(lat:number,lng:number,token:any):ResultData{
		let userInfo = this.getAdminUserByToken(token)
		let checkOut = this.findById('001','check-out-position').getData
		let lat1 = checkOut.lat
		let lng1 = checkOut.lng
		let r = checkOut.r
		let r1 = this.check(lat,lng,lat1,lng1)
		let obj:any = {
			...checkOut,
			...userInfo,
			id:new Date().getTime(),
			userId:userInfo.id,
			lat:lat,
			lng:lng,
			lat1:lat1,
			lng1:lng1
		}
		let d = new Date()
		obj.insertTime = d.getTime()
		obj.checkTime = d.getTime()
		let year:any = d.getFullYear()
		let month:any = d.getMonth()+1
		month = ((month+100)+'').substring(1)
		let date:any = d.getDate()
		date = ((date+100)+'').substring(1)
		obj.date = `${year}-${month}-${date}`
		let nowNum:any = d.getHours()*100+d.getMinutes()
		if(r>=r1){
			
			let beginTime = Number(checkOut.beginTime.split(':')[0])*100+
				Number(checkOut.beginTime.split(':')[1])
			let endTime = Number(checkOut.endTime.split(':')[0])*100+
				Number(checkOut.endTime.split(':')[1])
			if(nowNum>=beginTime&&nowNum<1200){
				obj.checkTypeId = '1'
				obj.remark = '迟到打卡'
			}else if(nowNum>=1200&&nowNum<endTime){
				obj.checkTypeId = '2'
				obj.remark = '早退打卡'
			}else{
				obj.checkTypeId = '0'
				obj.remark = '上/下班正常打卡'
			}
		}else{
			obj.checkTypeId = '3'
			obj.remark = '外勤打卡'
		}
		this.insertOne(obj,'check-out-record')
		return ResultData.end(200,obj,'打卡成功')
	}
	getRecordSimple(token:any):ResultData{
		
		let userInfo = this.getAdminUserByToken(token)
		let d = new Date()
		let year:any = d.getFullYear()
		let month:any = d.getMonth()+1
		month = ((month+100)+'').substring(1)
		let date:any = d.getDate()
		date = ((date+100)+'').substring(1)
		let checkDate = `${year}-${month}-${date}`
		let list = this.findAll('check-out-record').getData.list
		list = list.filter(item => {
			if(item.date == checkDate&&item.userId == userInfo.id){
				return true
			}
		})
		console.log(list)
		let beginInfo = list.filter(item => {
			let d = new Date(item.checkTime)
			let checkNum = d.getHours()*100+d.getMinutes()
			if(checkNum<1200){
				return true
			}
		}).shift()
		console.log(beginInfo)
		let beginNum
		if(beginInfo){
			let d = new Date(beginInfo.checkTime)
			beginNum = d.getHours()+':'+d.getMinutes()
		}
		let endInfo = list.pop()
		let endNum
		if(endInfo){
			let d = new Date(endInfo.checkTime)
			endNum = d.getHours()+':'+d.getMinutes()
		}
		console.log(endInfo)
		return ResultData.end(200,{beginTime:beginNum,endTime:endNum},'查询成功')
		
	}
	
	getRecordFull(date:string,token:any):ResultData{
		let userInfo = this.getAdminUserByToken(token)
		let list = this.findAll('check-out-record').getData.list
		list = list.filter(item => {
			if(item.date == date&&item.userId == userInfo.id){
				return true
			}
		})
		return ResultData.end(200,{list},'查询成功')
	}
}

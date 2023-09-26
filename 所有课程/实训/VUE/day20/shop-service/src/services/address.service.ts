import { Injectable } from '@nestjs/common';
import { ResultData} from '../utils/ResultData';
import { BaseService } from './base.service'
import {Address} from '../entity/address.entity'
import * as fs from 'fs';
import * as path from 'path'

@Injectable()
export class AddressService extends BaseService {
  insert(address:Address,token:any):ResultData {
		let res = fs.readFileSync(path.resolve(__dirname,`../../src/utils/data.json`))
		let userInfo = this.getAdminUserByToken(token)
		if(userInfo){
			let list = this.findAll('address').getData.list;
			let arr = list.filter(item => item.userId == userInfo.id)
			let data = JSON.parse(res.toString())
			let province = data['100000'][address.provinceId]
			let city = data[address.provinceId][address.cityId]
			let area = data[address.cityId][address.areaId]
			let obj = {
				id:new Date().getTime(),
				userId:userInfo.id,
				provinceId:address.provinceId,
				cityId:address.cityId,
				areaId:address.areaId,
				province,
				city,
				area,
				default:arr.length==0?1:0,
				address:address.address
			}
			return this.insertOne(obj,'address');
		}
		return ResultData.end(500,{},'新增失败')
	}
	update(address:Address,token:any):ResultData {
		let res = fs.readFileSync(path.resolve(__dirname,`../../src/utils/data.json`))
		let userInfo = this.getAdminUserByToken(token)
		if(userInfo){
			console.log(address)
			let data = JSON.parse(res.toString())
			let province = data['100000'][address.provinceId]
			let city = data[address.provinceId][address.cityId]
			let area = data[address.cityId][address.areaId]
			let obj = {
				...address,
				province,
				city,
				area
			}
			return this.updateOne(obj,'address');
		}
		return ResultData.end(500,{},'新增失败')
	}
	
	findAllForPage(pno:number,psize:number,token:any):ResultData {
		let userInfo = this.getAdminUserByToken(token)
		if(userInfo){
			let list = this.findAll('address').getData.list;
			return this.findForPage(pno,psize,'address',()=>{
				return list.filter(item => item.userId == userInfo.id).sort((a,b) => b.default - a.default)
			})
		}
		return ResultData.end(500,{},'查询失败')
	}
	
	setDefault(id:string,token:any):ResultData{
		let userInfo = this.getAdminUserByToken(token)
		if(userInfo){
			let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/address.table.json`))
			let baseData = JSON.parse(res.toString());
			baseData.data = baseData.data.map(item => {
				if(item.userId == userInfo.id){
					item.default = 0
				}
				if(item.id == id){
					item.default = 1
				}
				return item
			})
			fs.writeFileSync(path.resolve(__dirname,`../../src/tables/address.table.json`),JSON.stringify(baseData))
			return ResultData.end(200,{},"删除成功");
		}
		return ResultData.end(500,{},'设置失败')
	}
	
}

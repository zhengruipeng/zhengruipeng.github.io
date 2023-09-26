import { Injectable } from '@nestjs/common';
import { ResultData} from '../utils/ResultData';
import * as fs from 'fs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import { BaseService } from './base.service';
@Injectable()
export class UserService extends BaseService{
	
	createToken(user:any) {
	  return jwt.sign(user, 'shop-service', { expiresIn: 36000 });
	}
	findListAll(tableName:string):ResultData{
		let list = this.findAll(tableName).getData.list
		let roleList:Array<any> = this.findAll('role').getData.list;
		let deptList:Array<any> = this.findAll('dept').getData.list;
		list = list.map(item => {
			console.log(item)
			let role = roleList.filter(itemRole => {
				if(item.roleId == itemRole.id){
					return true;
				}else{
					return false;
				}
			})
			let dept = deptList.filter(itemDept => {
				if(item.deptId == itemDept.id){
					return true;
				}else{
					return false;
				}
			})
			if(role.length>0){
				item.roleName = role[0].name;
			}else{
				item.roleName = '';
			}
			if(dept.length>0){
				item.deptName = dept[0].name;
			}else{
				item.deptName = '';
			}
			return item;
		})
		return ResultData.end(200,{list},'查询成功')
	}
	findForPageByUserName (pno:number,psize:number,username:string = ''):ResultData{
		return this.findForPage(pno,psize,'user',() => {
			let res:ResultData = this.findAll('user');
			let roleList:Array<any> = this.findAll('role').getData.list;
			let deptList:Array<any> = this.findAll('dept').getData.list;
			let list = res.getData.list;
			list = list.filter((item:any) => {
				return item.username.indexOf(username)!= -1
			})
			list = list.map(item => {
				let role = roleList.filter(itemRole => {
					if(item.roleId == itemRole.id){
						return true;
					}else{
						return false;
					}
				})
				let dept = deptList.filter(itemDept => {
					if(item.deptId == itemDept.id){
						return true;
					}else{
						return false;
					}
				})
				if(role.length>0){
					item.roleName = role[0].name;
				}else{
					item.roleName = '';
				}
				if(dept.length>0){
					item.deptName = dept[0].name;
				}else{
					item.deptName = '';
				}
				return item;
			})
			return list
		});
	}
  getHello(): string {
    return 'Hello World!';
  }
	
	register(phone:string,password:string):ResultData{
		let shopUserList = this.findAll('shop-user').getData.list
		let arr = shopUserList.filter(item => item.phone == phone)
		if(arr.length>0){
			return  ResultData.end(500,{},"你的手机号码已被注册")
		}else{
			let obj = {
				id:new Date().getTime(),
				username: phone,
				password: password,
				nickname: "",
				userTypeId: "1",
				birthday: "",
				sex: "",
				phone: phone,
				face: "",
				freeze: "0",
				insertTime: new Date().getTime(),
				cardNumber: ""
			}
			this.insertOne(obj,'shop-user')
			return ResultData.end(200,obj,"注册成功，请登录")
		}
	}
	getUserList():ResultData{
		let res = fs.readFileSync(path.resolve(__dirname,'../../src/tables/user.table.json'))
		let list:Array<object> = JSON.parse(res.toString()).data;
		return ResultData.end(200,{list},"success")
	}
	checkLogin(username:string,password:string):boolean{
		console.log(username,password)
		let res = fs.readFileSync(path.resolve(__dirname,'../../src/tables/user.table.json'))
		let res1 = fs.readFileSync(path.resolve(__dirname,'../../src/tables/shop-user.table.json'))
		let list:Array<any> = JSON.parse(res.toString()).data;
		let list1:Array<any> = JSON.parse(res1.toString()).data;
		let arr = list.filter(item => {
			return item.username == username&&item.password==password
		})
		let arr1 = list1.filter(item => {
			return item.username == username&&item.password==password
		})
		return arr.length>0||arr1.length>0?true:false;
	}
	login(username:string,password:string):ResultData{
		let res = fs.readFileSync(path.resolve(__dirname,'../../src/tables/user.table.json'))
		let list:Array<any> = JSON.parse(res.toString()).data;
		let arr = list.filter(item => {
			return item.username == username&&item.password==password
		})
		
		if(arr.length>0){
			let userInfo = arr[0]
			let deptInfo = this.findById(userInfo.deptId,'dept').getData
			userInfo.deptName = deptInfo.name
			
			let token = this.createToken(userInfo)
			return ResultData.end(200,{token,userInfo:arr[0]},'登录成功')
		}else{
			return ResultData.end(500,{},'用户名或密码错误')
		}
	}
	loginShop(username:string,password:string):ResultData{
		let res = fs.readFileSync(path.resolve(__dirname,'../../src/tables/shop-user.table.json'))
		let list:Array<any> = JSON.parse(res.toString()).data;
		let arr = list.filter(item => {
			return item.phone == username&&item.password==password
		})
		if(arr.length>0){
			let token = this.createToken(arr[0])
			return ResultData.end(200,{token,userInfo:arr[0]},'登录成功')
		}else{
			return ResultData.end(500,{},'用户名或密码错误')
		}
	}
	
	changePassword(phone:string,password:string):ResultData{
		let userList = this.findAll('shop-user').getData.list;
		let arr = userList.filter(item => item.phone == phone)
		if(arr.length>0){
			let user = arr[0]
			user.password = password
			return this.updateOne(user,'shop-user')
		}
		return ResultData.end(500,{},'手机号码不存在')
	}
}

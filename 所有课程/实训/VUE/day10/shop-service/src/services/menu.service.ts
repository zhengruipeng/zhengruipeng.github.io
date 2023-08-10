import { Injectable } from '@nestjs/common';
import { ResultData} from '../utils/ResultData';
import * as fs from 'fs';
import * as path from 'path';
import { BaseService } from './base.service';
import { MenuRole } from '../entity/menu-role.entity'
import { MenuTop } from '../entity/menu-top.entity'
@Injectable()
export class MenuService extends BaseService {
	
	
	findAllByRoleId (roleId:string):ResultData{
		let roleMenuRes:Array<any> = this.findAll('role-menu').getData.list;
		let menuIds = roleMenuRes.filter(item=>item.roleId == roleId?true:false).map(item => item.menuId);
		let menuRes:Array<any> = this.findAll('menu').getData.list;
		let menuParent = menuRes.filter(item => menuIds.indexOf(item.id)!=-1)
		menuParent.forEach(item => {
			if(item.children){
				item.children = item.children.filter(itemChild => {
					return menuIds.indexOf(itemChild.id)!=-1;
				})
			}
		})
		console.log(roleId,menuParent)
		return ResultData.end(200,menuParent,'');
	}
  insertMenuRole(menuRole:MenuRole):ResultData{
		let arr = [];
		menuRole.ids.forEach((item,index) => {
			arr.push({
				id:new Date().getTime()+index,
				roleId:menuRole.roleId,
				menuId:item
			})
		})
		let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/role-menu.table.json`))
		let baseData = JSON.parse(res.toString());
		let arr1 = baseData.data.filter(item => {
			if(item.roleId == menuRole.roleId){
				return false
			}else{
				return true
			}
		})
		baseData.data = [...arr1,...arr]
		fs.writeFileSync(path.resolve(__dirname,`../../src/tables/role-menu.table.json`),JSON.stringify(baseData))
		return ResultData.end(200,{},"操作成功");
	}
	
	insertTopMenu(menuTop:MenuTop):ResultData{
		let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/menu.table.json`))
		let baseData = JSON.parse(res.toString());
		baseData.data.push({
			id:menuTop.id,
			name:menuTop.name,
			icon:menuTop.icon
		})
		fs.writeFileSync(path.resolve(__dirname,`../../src/tables/menu.table.json`),JSON.stringify(baseData))
		return ResultData.end(200,{},"操作成功");
	}
	insertChildMenu(menuTop:MenuTop,pid:string):ResultData{
		let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/menu.table.json`))
		let baseData = JSON.parse(res.toString());
		baseData.data = baseData.data.map(item => {
			if(item.id == pid){
				if(!item.children){
					item.children = []
				}
				item.children.push({
					id:menuTop.id,
					name:menuTop.name,
					icon:menuTop.icon,
					url:menuTop.url
				})
			}
			return item;
		})
		fs.writeFileSync(path.resolve(__dirname,`../../src/tables/menu.table.json`),JSON.stringify(baseData))
		return ResultData.end(200,{},"操作成功");
	}
	updateTopMenu(menuTop:MenuTop):ResultData{
		let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/menu.table.json`))
		let baseData = JSON.parse(res.toString());
		baseData.data = baseData.data.map(item => {
			if(item.id == menuTop.id){
				item.name = menuTop.name;
				item.icon = menuTop.icon;
			}
			return item;
		})
		fs.writeFileSync(path.resolve(__dirname,`../../src/tables/menu.table.json`),JSON.stringify(baseData))
		return ResultData.end(200,{},"操作成功");
	}
	updateChildMenu(menuTop:MenuTop):ResultData{
		let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/menu.table.json`))
		let baseData = JSON.parse(res.toString());
		baseData.data = baseData.data.map(item => {
			if(item.children){
				item.children = item.children.map(itemChild => {
					if(itemChild.id == menuTop.id){
						itemChild.name = menuTop.name
						itemChild.icon = menuTop.icon
						itemChild.url = menuTop.url
					}
					return itemChild;
				})
			}
			return item;
		})
		fs.writeFileSync(path.resolve(__dirname,`../../src/tables/menu.table.json`),JSON.stringify(baseData))
		return ResultData.end(200,{},"操作成功");
	}
	findById(id:string):ResultData{
		let menuList = this.findAll('menu').getData.list;
		let arr = menuList.filter(item => item.id==id)
		if(arr.length == 1){
			return ResultData.end(200,arr[0],"查询成功");
		}else{
			let arr1 = []
			menuList.forEach(item =>{
				if(item.children){
					item.children.forEach((item1) => {
						if(item1.id==id){
							arr1.push(item1)
						}
					})
				}
			})
			if(arr1.length >0 ){
				return ResultData.end(200,arr1[0],"查询成功");
			}else{
				return ResultData.end(500,{},"未找到菜单");
			}
		}
	}
	deleteOneById(id:string):ResultData{
		let res = fs.readFileSync(path.resolve(__dirname,`../../src/tables/menu.table.json`))
		let baseData = JSON.parse(res.toString());
		let arr = baseData.data.filter(item => item.id != id)
		if(arr.length<baseData.data.length){
			baseData.data = arr
		}else{
			baseData.data = baseData.data.map(item => {
				if(item.children){
					item.children = item.children.filter(itemChild => {
						return itemChild.id!=id
					})
				}
				return item;
			})
		}
		fs.writeFileSync(path.resolve(__dirname,`../../src/tables/menu.table.json`),JSON.stringify(baseData))
		return ResultData.end(200,{},"操作成功");
	}
}

import { Injectable } from '@nestjs/common';
import { ResultData} from '../utils/ResultData';
import * as fs from 'fs';
import * as path from 'path';
import { BaseService } from './base.service';
@Injectable()
export class NewsService extends BaseService {
	findForPageByExample(pno:number,psize:number,
		name:string = '',
		newsTypeId:number,tableName:string):ResultData{
		return this.findForPage(pno,psize,tableName,() => {
			let res:ResultData = this.findAll(tableName)
			let newsTypeList = this.findAll('news-type').getData.list
			let arr:Array<any> = res.getData.list;
			if(name.trim().length>0){
				arr = arr.filter(item => {
					return item.name.indexOf(name)!=-1
				})
			}
			if(newsTypeId){
				arr = arr.filter(item => {
					return item.newsTypeId == newsTypeId
				})
			}
			arr = arr.map(item => {
				let arr = newsTypeList.filter(itemType => {
					return itemType.id == item.newsTypeId
				})
				if(arr.length>0){
					item.newsTypeName = arr[0].name
				}
				return item;
			})
			return arr.sort((a,b) => b.insertTime-a.insertTime);
		})
	}
}

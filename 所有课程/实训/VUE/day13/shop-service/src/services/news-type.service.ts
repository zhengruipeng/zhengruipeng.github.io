import { Injectable } from '@nestjs/common';
import { ResultData} from '../utils/ResultData';
import * as fs from 'fs';
import * as path from 'path';
import { BaseService } from './base.service';
@Injectable()
export class NewsTypeService extends BaseService {
	findForPageByExample(pno:number,psize:number,name:string = '',remark:string = '',tableName:string):ResultData{
		return this.findForPage(pno,psize,tableName,() => {
			let res:ResultData = this.findAll(tableName)
			let arr:Array<any> = res.getData.list;
			if(name.trim().length>0){
				arr = arr.filter(item => {
					return item.name.indexOf(name)!=-1
				})
			}
			if(remark.trim().length>0){
				arr = arr.filter(item => {
					return item.remark.indexOf(remark)!=-1
				})
			}
			return arr;
		})
	}
}

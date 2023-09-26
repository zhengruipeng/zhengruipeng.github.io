import { Injectable } from '@nestjs/common';
import { ResultData} from '../utils/ResultData';
import { BaseService } from './base.service'
import * as fs from 'fs';
import * as path from 'path'
@Injectable()
export class ApiTestService extends BaseService {
  findByUserNameAndPassWord(username:string,password:string,tableName:string):ResultData{
		
		return this.findAllByExample(tableName,() => {
			let res = this.findAll(tableName);
			return res.getData.list.filter(item => {
				return item.username==username && item.password == password
			})
		})
	}
}

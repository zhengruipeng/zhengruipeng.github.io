import { Injectable } from '@nestjs/common';
import { ResultData} from '../utils/ResultData';
import * as fs from 'fs';
import * as path from 'path'
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
	getUserList():ResultData{
		let res = fs.readFileSync(path.resolve(__dirname,'../../src/tables/user.table.json'))
		let list:object = JSON.parse(res.toString()).data;
		return ResultData.end(200,{list},"success")
	}
}

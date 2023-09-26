import { Controller,Put,Header,Delete,Req, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { CheckOutService } from '../services/check-out.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { CheckOutPosition } from '../entity/check-out-position.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("考勤接口")
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller("/check-out")
export class CheckOutController {
  constructor(private readonly checkOutService: CheckOutService) {}
	
	@ApiOperation({summary:'获取考勤范围信息'})
	@Get('/get/position')
	getCheckOutPosition():ResultData{
		return this.checkOutService.getCheckOutPosition()
	}
	@ApiOperation({summary:'修改考勤范围信息'})
	@Put('/update/position')
	saveCheckOutPostion(@Body() data:CheckOutPosition):ResultData{
		return this.checkOutService.updateOne(data,'check-out-position')
	}
	@Get('/in-out/position')
	@ApiOperation({summary:'根据经纬度查询是否在考勤范围内'})
	@ApiQuery({
		name:'lat',
		description:'纬度',
		example:0
	})
	@ApiQuery({
		name:'lng',
		description:'经度',
		example:0
	})
	
	checkPostion(
		@Query('lat') lat:number = 1,
		@Query('lng') lng:number = 10):ResultData{
		return this.checkOutService.
			checkInOrOut(
				lat,
				lng)
	}
	
	@Get('/in-out/check-in')
	@ApiOperation({summary:'根据经纬度进行考勤打卡'})
	@ApiQuery({
		name:'lat',
		description:'纬度',
		example:0
	})
	@ApiQuery({
		name:'lng',
		description:'经度',
		example:0
	})
	checkIn(@Query('lat') lat:number = 1,
		@Query('lng') lng:number = 10,
		@Req() req:any):ResultData{
		let token = req.headers['authorization']
		return this.checkOutService.checkIn(lat,lng,token)	
	}
	
	@Get('/in-out/record-simple')
	@ApiOperation({summary:'获取当前用户今日的上下班打卡粗略记录'})
	getRecordSimple(
		@Req() req:any):ResultData{
		let token = req.headers['authorization']
		return this.checkOutService.getRecordSimple(token)	
	}
	
	@Get('/in-out/record-full')
	@ApiOperation({summary:'根据指定日期获取完整的考勤记录'})
	@ApiQuery({
		name:'date',
		description:'日期yyyy-MM-dd 如2021-01-01',
		example:'2021-01-01'
	})
	getRecordFull(
		@Query('date') date:string,
		@Req() req:any):ResultData{
		let token = req.headers['authorization']
		return this.checkOutService.getRecordFull(date,token)	
	}
	
	
	@Get('/in-out/find/id/:id')
	@ApiOperation({summary:'根据考勤记录的id获取指定的考勤记录'})
	@ApiParam({
		name:'id',
		description:'考勤记录的id'
	})
	findById(@Param('id')id:string):ResultData{
		return this.checkOutService.findById(id,'check-out-record')
	}
}

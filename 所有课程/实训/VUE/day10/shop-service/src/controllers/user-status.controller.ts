import { Controller,Put,Header,Delete, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { UserStatusService } from '../services/user-status.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { UserStatus } from '../entity/user-status.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("员工状态接口")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("/user-status")
export class UserStatusController {
  constructor(private readonly userStatusService: UserStatusService) {}
	
	@Get('/list/all')
	@ApiOperation({summary:'获取所有的员工状态'})
	findAll():ResultData{
		return this.userStatusService.findAll('user-status')
	}
	@Get('/list/page')
	@ApiOperation({summary:'分页获取所有的员工状态'})
	@ApiQuery({
		name:'pno',
		description:'页号',
		example:1
	})
	@ApiQuery({
		name:'psize',
		description:'每页多少条',
		example:10
	})
	@ApiQuery({
		name:'name',
		description:'状态名称（模糊查询）',
		example:'数码',
		required:false
	})
	@ApiQuery({
		name:'remark',
		description:'备注（模糊查询）',
		example:'备注',
		required:false
	})
	findForPage(
		@Query('pno') pno:number = 1,
		@Query('psize') psize:number = 10,
		@Query('name') name:string, 
		@Query('remark') remark:string ):ResultData{
		return this.userStatusService.findForPageByExample(pno,psize,name,remark,'user-status')
	}
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据id删除员工状态'})
	deleteById(@Param('id') id:string):ResultData{
		return this.userStatusService.deleteById(id,'user-status')
	}
	@Put('/insert')
	@ApiOperation({summary:'新增员工状态'})
	insert(@Body() userStatus:UserStatus):ResultData{
		userStatus.insertTime = new Date().getTime()
		return this.userStatusService.insertOne(userStatus,'user-status')
	}
	
	@Put('/update')
	@ApiOperation({summary:'修改员工状态'})
	update(@Body() userStatus:UserStatus):ResultData{
		return this.userStatusService.updateOne(userStatus,'user-status')
	}
	
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询员工状态'})
	@ApiParam({
		name:'id',
		description:'状态的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.userStatusService.findById(id,'user-status')
	}
	
}

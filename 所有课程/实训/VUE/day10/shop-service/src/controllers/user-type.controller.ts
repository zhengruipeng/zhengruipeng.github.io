import { Controller,Put,Header,Delete, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { UserTypeService } from '../services/user-type.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { UserType } from '../entity/user-type.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("会员类型接口")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("/user-type")
export class UserTypeController {
  constructor(private readonly userTypeService: UserTypeService) {}
	
	@Get('/list/all')
	@ApiOperation({summary:'获取所有的会员类型'})
	findAll():ResultData{
		return this.userTypeService.findAll('user-type')
	}
	@Get('/list/page')
	@ApiOperation({summary:'分页获取所有的会员类型'})
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
		description:'类型名称（模糊查询）',
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
		return this.userTypeService.findForPageByExample(pno,psize,name,remark,'user-type')
	}
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据id删除会员类型'})
	deleteById(@Param('id') id:string):ResultData{
		return this.userTypeService.deleteById(id,'user-type')
	}
	@Put('/insert')
	@ApiOperation({summary:'新增会员类型'})
	insert(@Body() userType:UserType):ResultData{
		userType.insertTime = new Date().getTime()
		return this.userTypeService.insertOne(userType,'user-type')
	}
	
	@Put('/update')
	@ApiOperation({summary:'修改会员类型'})
	update(@Body() userType:UserType):ResultData{
		return this.userTypeService.updateOne(userType,'user-type')
	}
	
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询会员类型'})
	@ApiParam({
		name:'id',
		description:'类型的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.userTypeService.findById(id,'user-type')
	}
	
}

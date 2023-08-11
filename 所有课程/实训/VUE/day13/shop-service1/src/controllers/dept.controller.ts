import { Controller,Put,Header,Delete, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { DeptService } from '../services/dept.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { Dept } from '../entity/dept.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("部门接口")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("/dept")
export class DeptController {
  constructor(private readonly deptService: DeptService) {}
	@Get('/list/all')
	@ApiOperation({summary:'获取所有的部门'})
	findAll():ResultData{
		return this.deptService.findAll('dept')
	}
	
	@Get('/list/page')
	@ApiOperation({summary:'分页获取所有的部门'})
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
		description:'部门名称（模糊查询）',
		example:'部门',
		required:false
	})
	findForPage(
		@Query('pno') pno:number = 1,
		@Query('psize') psize:number = 10,
		@Query('name') name:string):ResultData{
		return this.deptService.
			findForPageByExample(
				pno,
				psize,
				name,'dept')
	}
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据id删除部门'})
	deleteById(@Param('id') id:string):ResultData{
		return this.deptService.deleteById(id,'dept')
	}
	@Put('/insert')
	@ApiOperation({summary:'新增部门'})
	insert(@Body() dept:Dept):ResultData{
		return this.deptService.insertOne(dept,'dept')
	}
	
	@Put('/update')
	@ApiOperation({summary:'修改部门'})
	update(@Body() dept:Dept):ResultData{
		return this.deptService.updateOne(dept,'dept')
	}
	
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询部门'})
	@ApiParam({
		name:'id',
		description:'的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.deptService.findById(id,'dept')
	}
	
	@Get('/list/user')
	@ApiOperation({summary:'获取部门员工列表'})
	findDeptAndUser(){
		return this.deptService.findDeptAndUser()
	}
	@Delete('/delete/user')
	@ApiOperation({summary:'移除部门员工'})
	@ApiQuery({
		name:'id',
		description:'的id'
	})
	deleteDeptUser(@Query('id') id:string):ResultData{
		return this.deptService.deleteDeptUser(id,'dept')
	}
	@Put('/add/user')
	@ApiQuery({
		name:'ids',
		description:'用户id的数组'
	})
	@ApiQuery({
		name:'id',
		description:'部门的id'
	})
	addUser(@Query('ids') ids:Array<any>,@Query('id') id:string):ResultData{
		return this.deptService.addUser(ids,id,'dept')
	}
}

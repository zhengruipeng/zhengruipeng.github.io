import { Controller,Put,Header,Delete, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import {Role} from '../entity/role.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("角色接口")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("/role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
	
	
	@Get('/list/all')
	@ApiOperation({summary:'获取所有的角色'})
	findAll():ResultData{
		return this.roleService.findAll('role')
	}
	@Get('/list/page')
	@ApiOperation({summary:'分页获取所有的角色'})
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
	findForPage(@Query('pno') pno:number = 1,@Query('psize') psize:number = 10):ResultData{
		return this.roleService.findForPage(pno,psize,'role',null)
	}
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据角色id删除角色'})
	deleteById(@Param('id') id:string):ResultData{
		return this.roleService.deleteById(id,'role')
	}
	@Put('/insert')
	@ApiOperation({summary:'新增角色'})
	insert(@Body() role:Role):ResultData{
		role.insertTime = new Date().getTime()
		return this.roleService.insertOne(role,'role')
	}
	
	@Put('/update')
	@ApiOperation({summary:'修改角色'})
	update(@Body() role:Role):ResultData{
		return this.roleService.updateOne(role,'role')
	}
	
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询角色'})
	@ApiParam({
		name:'id',
		description:'角色的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.roleService.findById(id,'role')
	}
	
}

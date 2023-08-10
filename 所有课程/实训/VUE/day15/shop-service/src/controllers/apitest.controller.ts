import { Controller, Get,Post,Query,Body,Param,Put,Delete } from '@nestjs/common';
import { ApiTestService } from '../services/apitest.service';
import { ResultData } from '../utils/ResultData';
import { ApiTags,ApiOperation,ApiParam,ApiQuery,ApiBody } from '@nestjs/swagger'
import { User } from '../entity/user.entity';
import { UserParam } from '../entity/user-param.entity'
import { Ids } from '../entity/ids.entity'
@Controller("/api-test")
@ApiTags("接口调用练习")
export class ApiTestController {
  constructor(private readonly apiTestService: ApiTestService) {}
  @Get("/get/demo1")
	@ApiOperation({
		summary:'无参数get接口调用练习，获取所有管理员数据'
	})
  getDemo1(): ResultData {
    return this.apiTestService.findAll('user');
  }
	
	
	@Get("/get/demo2")
	@ApiOperation({
		summary:'有参数get接口调用练习，根据用户账号密码查询管理员用户信息'
	})
	@ApiQuery({
			name: 'username',
			description: '用户账号',
			example:'admin'
	})
	@ApiQuery({
			name: 'password',
			description: '用户密码',
			example:'123456'
	})
	getDemo2(
		@Query('username') 
		username:string,
		@Query('password') password:string): ResultData {
	  return this.apiTestService.findByUserNameAndPassWord(username,password,'user');
	}
	
	@Post("/post/demo1")
	@ApiOperation({
		summary:'无参数post接口调用练习，同get方式的示例'
	})
	postDemo1(): ResultData {
	  return this.apiTestService.findAll('user');
	}
	
	@Post("/post/demo2")
	@ApiOperation({
		summary:'有参数post接口调用练习，根据用户账号密码查询用户信息，通过json和表单提交进行传参数，同get方式的示例'
	})
	postDemo2(@Body() user:UserParam): ResultData {
	  return this.apiTestService.findByUserNameAndPassWord(user.username,user.password,'user');
	}
	
	@Post("/path/demo1/username/:username/password/:password")
	@ApiOperation({
		summary:'有参数Post接口调用练习，通过url路径传参数，通过path传递参数来实现通过账号密码获取管理员用户数据'
	})
	@ApiParam({
		name:'username',
		description:'用户账号',
		example:'admin'
	})
	@ApiParam({
		name:'password',
		description:'用户密码',
		example:'123456'
	})
	pathDemo1(
		@Param('username') username:string,
		@Param('password') password:string):ResultData{
		return ResultData.end(200,{username,password},"成功")
	}
	
	@Put("/put/demo1")
	@ApiOperation({
		summary:'put接口练习,传入user对象并添加到数据中'
	})
	putDemo(@Body() user:User):ResultData{
		return this.apiTestService.insertOne(user,'user')
	}
	@Delete("/delete/demo1/id/:id")
	@ApiOperation({
		summary:'delete接口练习,传入id数字并删除指定id的对象。通过path传参数'
	})
	deleteDemo1(@Param('id') id:string){
		return this.apiTestService.deleteById(id,'user')
	}
	@Delete("/delete/demo2")
	@ApiOperation({
		summary:'delete接口练习,传入id数字并删除指定id的对象。通过url传参数'
	})
	@ApiQuery({
		name:'id',
		description:'id数字',
		example:7
	})
	deleteDemo2(@Query('id') id:string){
		return this.apiTestService.deleteById(id,'user')
	}
	@Delete("/delete/demo3")
	@ApiOperation({
		summary:'delete接口练习,传入ids数组并删除数组内的所有。通过body传参数'
	})
	@ApiBody({
		type:Ids,
		description:'id数组',
	})
	deleteDemo3(@Body("ids") ids:Array<any>){
		return this.apiTestService.deleteByIds(ids,'user')
	}
}

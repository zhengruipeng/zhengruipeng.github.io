import { Controller,Put,Header,Delete,Req, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express'
import { UserService } from '../services/user.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import {User} from '../entity/user.entity'
import {UserParam} from '../entity/user-param.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("用户接口")
@ApiBearerAuth()
@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}
	
	@Post('/login')
	@ApiOperation({summary:'用户登录'})
	login(@Body() user:UserParam):ResultData{
		return this.userService.login(user.username,user.password)
	}
	
	@Post('/login/shop')
	@ApiOperation({summary:'商城端用户登录'})
	loginShop(@Body() user:UserParam):ResultData{
		return this.userService.loginShop(user.username,user.password)
	}
	@Get('/code')
	@ApiOperation({summary:'获取验证码'})
	code(@Req() req:any):ResultData{
		let random = Math.floor((Math.random()*10000)+10000)
		req.session.code = (random+"").substring(1)
		return ResultData.end(200,{code:req.session.code},'获取成功')
	}
	
	
	@Get('/change/pass')
	@ApiOperation({summary:'商城会员修改密码'})
	@ApiQuery({
		name:'phone',
		description:'手机号码',
		example:'18945051918',
	})
	@ApiQuery({
		name:'code',
		description:'验证码',
		example:'0989',
	})
	@ApiQuery({
		name:'password',
		description:'密码',
		example:'123456',
	})
	changePassword(@Req() req:any,
		@Query('phone') phone:string,
		@Query('code') code:string,
		@Query('password') password:string):ResultData{
		if(code == req.session.code){
			return this.userService.changePassword(phone,password)
		}else{
			return ResultData.end(500,{},'验证码不正确')
		}
		
	}
	
	
	@Get('/register')
	@ApiOperation({summary:'商城会员注册'})
	@ApiQuery({
		name:'phone',
		description:'手机号码',
		example:'18945051918',
	})
	@ApiQuery({
		name:'code',
		description:'验证码',
		example:'0989',
	})
	@ApiQuery({
		name:'password',
		description:'密码',
		example:'123456',
	})
	register(@Req() req:any,
		@Query('phone') phone:string,
		@Query('code') code:string,
		@Query('password') password:string):ResultData{
		if(req.session.code!=code){
			return ResultData.end(500,{},'验证码错误')
		}
		return this.userService.register(phone,password)
	}
	
	@Get("/menu/list")
	@UseGuards(AuthGuard('jwt'))
	@ApiOperation({summary:'获取用户菜单的练习接口'})
	getMenuList():ResultData {
		return this.userService.findAll('menu-test')
	}
	
	
	@Get("/find/id/:id")
	@UseGuards(AuthGuard('jwt'))
	@ApiOperation({summary:'根据用户id获取用户'})
	getUser(@Param('id') id:string):ResultData {
		return this.userService.findById(id,'user')
	}
	@Put("/insert")
	@UseGuards(AuthGuard('jwt'))
	@ApiOperation({summary:'增加用户'})
	insert(@Body() user:User){
		user.insertTime = new Date().getTime();
		return this.userService.insertOne(user,'user');
	}
	@Put("/update")
	@UseGuards(AuthGuard('jwt'))
	@ApiOperation({summary:'编辑用户'})
	update(@Body() user:User){
		return this.userService.updateOne(user,'user');
	}
	@Get("/list/all")
	@ApiOperation({summary:'查询所有用户'})
	getUserListAll():ResultData {
		return this.userService.findListAll('user')
	}
	@Get("/list/page")
	@UseGuards(AuthGuard('jwt'))
	@ApiOperation({summary:'分页查询用户列表'})
	@ApiQuery({
		name:'pno',
		description:'页号',
		example:1,
	})
	@ApiQuery({
		name:'psize',
		description:'每页多少条',
		example:10
	})
	@ApiQuery({
		name:'username',
		description:'用户账号',
		example:'admin',
		required:false
	})
	getUserListForPageByUserName(@Query('pno') pno:number,@Query('psize') psize:number,
		@Query('username') username:string):ResultData {
		return this.userService.findForPageByUserName(pno,psize,username)
	}
	
	@Delete('/id/:id')
	@ApiOperation({summary:'根据id删除用户'})
	@ApiParam({
		name:'id',
		description:'用户的id'
	})
	deleteById(@Param('id') id:string):ResultData{
		return this.userService.deleteById(id,'user')
	}
}

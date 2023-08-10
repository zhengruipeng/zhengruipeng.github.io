import { Controller,Put,Header,Delete,Req, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express'
import { AddressService } from '../services/address.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import {Address} from '../entity/address.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("收货地址接口")
@ApiBearerAuth()
@Controller("/address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
	@Get('/list/page')
	@ApiOperation({summary:'分页获取所有的会员'})
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
	findForPage(
		@Query('pno') pno:number = 1,
		@Query('psize') psize:number = 10,
		@Req() req:any ) :ResultData{
		let token = req.headers['authorization']
		return this.addressService.findAllForPage(pno,psize,token)
	}
	
	@Put('/insert')
	@ApiOperation({summary:'新增收货地址'})
	insert(@Body() address:Address,@Req() req:any):ResultData{
		let token = req.headers['authorization']
		return this.addressService.insert(address,token)
	}
	
	@Put('/update')
	@ApiOperation({summary:'编辑收货地址'})
	update(@Body() address:Address,@Req() req:any):ResultData{
		let token = req.headers['authorization']
		return this.addressService.update(address,token)
	}
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询收货地址'})
	@ApiParam({
		name:'id',
		description:'地址的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.addressService.findById(id,'address')
	}
	
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据id删除地址'})
	deleteById(@Param('id') id:string):ResultData{
		return this.addressService.deleteById(id,'address')
	}
	
	@Post('/default/id/:id')
	@ApiOperation({summary:'设置默认'})
	setDefault(@Param('id') id:string,@Req() req:any):ResultData{
		let token = req.headers['authorization']
		return this.addressService.setDefault(id,token)
	}
}

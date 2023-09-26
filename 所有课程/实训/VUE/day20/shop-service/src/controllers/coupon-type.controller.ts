import { Controller,Put,Header,Delete, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { CouponTypeService } from '../services/coupon-type.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { CouponType } from '../entity/coupon-type.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("优惠券类型接口")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("/coupon-type")
export class CouponTypeController {
  constructor(private readonly couponTypeService: CouponTypeService) {}
	@Get('/list/all')
	@ApiOperation({summary:'获取所有的优惠券类型'})
	findAll():ResultData{
		return this.couponTypeService.findAll('coupon-type')
	}
	
	@Get('/list/page')
	@ApiOperation({summary:'分页获取所有的优惠券类型'})
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
		return this.couponTypeService.findForPageByExample(pno,psize,name,remark,'coupon-type')
	}
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据id删除优惠券类型'})
	deleteById(@Param('id') id:string):ResultData{
		return this.couponTypeService.deleteById(id,'coupon-type')
	}
	@Put('/insert')
	@ApiOperation({summary:'新增优惠券类型'})
	insert(@Body() couponType:CouponType):ResultData{
		couponType.insertTime = new Date().getTime()
		return this.couponTypeService.insertOne(couponType,'coupon-type')
	}
	
	@Put('/update')
	@ApiOperation({summary:'修改优惠券类型'})
	update(@Body() couponType:CouponType):ResultData{
		return this.couponTypeService.updateOne(couponType,'coupon-type')
	}
	
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询优惠券类型'})
	@ApiParam({
		name:'id',
		description:'类型的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.couponTypeService.findById(id,'coupon-type')
	}
	
}

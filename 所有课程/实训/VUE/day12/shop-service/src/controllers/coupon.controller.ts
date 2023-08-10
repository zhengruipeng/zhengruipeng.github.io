import { Controller,Put,Header,Delete, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { CouponService } from '../services/coupon.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { CouponMultiple } from '../entity/coupon-multiple.entity'
import { Coupon } from '../entity/coupon.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("优惠券接口")
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller("/coupon")
export class CouponController {
  constructor(private readonly couponService: CouponService) {}
	
	
	@Get('/list/page')
	@ApiOperation({summary:'分页获取所有的优惠券'})
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
		description:'优惠券名称（模糊查询）',
		example:'大米',
		required:false
	})
	@ApiQuery({
		name:'couponTypeId',
		description:'优惠券类型id',
		example:'1',
		required:false
	})
	findForPage(
		@Query('pno') pno:number = 1,
		@Query('psize') psize:number = 10,
		@Query('name') name:string, 
		@Query('couponTypeId') couponTypeId:number ):ResultData{
		return this.couponService.
			findForPageByExample(
				pno,
				psize,
				name,
				couponTypeId,'coupon')
	}
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据id删除优惠券'})
	deleteById(@Param('id') id:string):ResultData{
		return this.couponService.deleteById(id,'coupon')
	}
	@Put('/insert')
	@ApiOperation({summary:'新增优惠券'})
	insert(@Body() coupon:Coupon):ResultData{
		coupon.insertTime = new Date().getTime()
		coupon.status = 0;
		coupon.targetTime = new Date(coupon.targetTime).getTime()+''
		return this.couponService.insertOne(coupon,'coupon')
	}
	
	@Put('/update')
	@ApiOperation({summary:'修改优惠券'})
	update(@Body() coupon:Coupon):ResultData{
		coupon.targetTime = new Date(coupon.targetTime).getTime()+''
		return this.couponService.updateOne(coupon,'coupon')
	}
	
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询优惠券'})
	@ApiParam({
		name:'id',
		description:'的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.couponService.findById(id,'coupon')
	}
	@Put("/insert/multiple")
	@ApiOperation({summary:'批量创建优惠券接口'})
	insertMultiple(@Body() couponMultiple:CouponMultiple):ResultData{
		couponMultiple.targetTime = new Date(couponMultiple.targetTime).getTime()+''
		return this.couponService.insertMultiple(couponMultiple)
	}
	
}

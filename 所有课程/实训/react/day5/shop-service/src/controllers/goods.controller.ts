import { Controller,Put,Header,Delete, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { GoodsService } from '../services/goods.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { Goods } from '../entity/goods.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("商品接口")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("/goods")
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}
	
	
	@Get('/list/page')
	@ApiOperation({summary:'分页获取所有的商品'})
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
		description:'商品名称（模糊查询）',
		example:'大米',
		required:false
	})
	@ApiQuery({
		name:'isOnSale',
		description:'商品是否在架，1在架，0不在架',
		example:'1',
		required:false
	})
	@ApiQuery({
		name:'goodsTypeId',
		description:'商品类型id',
		example:'1',
		required:false
	})
	findForPage(
		@Query('pno') pno:number = 1,
		@Query('psize') psize:number = 10,
		@Query('name') name:string, 
		@Query('isOnSale') isOnSale:number, 
		@Query('goodsTypeId') goodsTypeId:number ):ResultData{
		return this.goodsService.
			findForPageByExample(
				pno,
				psize,
				name,
				isOnSale,
				goodsTypeId,'goods')
	}
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据id删除商品'})
	deleteById(@Param('id') id:string):ResultData{
		return this.goodsService.deleteById(id,'goods')
	}
	@Put('/insert')
	@ApiOperation({summary:'新增商品'})
	insert(@Body() goods:Goods):ResultData{
		goods.insertTime = new Date().getTime()
		goods.isOnSale = 0
		return this.goodsService.insertOne(goods,'goods')
	}
	
	@Put('/update')
	@ApiOperation({summary:'修改商品'})
	update(@Body() goods:Goods):ResultData{
		return this.goodsService.updateOne(goods,'goods')
	}
	
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询商品'})
	@ApiParam({
		name:'id',
		description:'的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.goodsService.findById(id,'goods')
	}
	
	@Get('/set/onsale')
	@ApiOperation({summary:'设置上下架'})
	@ApiQuery({
		name:'id',
		description:'商品id'
	})
	@ApiQuery({
		name:'isOnSale',
		description:'商品状态，0下架，1上架'
	})
	setOnSale(@Query('id') id:string,@Query('isOnSale') isOnSale:number):ResultData{
		return this.goodsService.setOnSale(id,isOnSale,'goods')
	}
}

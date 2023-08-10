import { Controller,Put,Header,Delete, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { GoodsTypeService } from '../services/goods-type.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { GoodsType } from '../entity/goods-type.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("商品类型接口")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("/goods-type")
export class GoodsTypeController {
  constructor(private readonly goodsTypeService: GoodsTypeService) {}
	
	@Get('/list/all')
	@ApiOperation({summary:'获取所有的商品类型'})
	findAll():ResultData{
		return this.goodsTypeService.findAll('goods-type')
	}
	@Get('/list/page')
	@ApiOperation({summary:'分页获取所有的商品类型'})
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
		return this.goodsTypeService.findForPageByExample(pno,psize,name,remark,'goods-type')
	}
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据id删除商品类型'})
	deleteById(@Param('id') id:string):ResultData{
		return this.goodsTypeService.deleteById(id,'goods-type')
	}
	@Put('/insert')
	@ApiOperation({summary:'新增商品类型'})
	insert(@Body() goodsType:GoodsType):ResultData{
		goodsType.insertTime = new Date().getTime()
		return this.goodsTypeService.insertOne(goodsType,'goods-type')
	}
	
	@Put('/update')
	@ApiOperation({summary:'修改商品类型'})
	update(@Body() goodsType:GoodsType):ResultData{
		return this.goodsTypeService.updateOne(goodsType,'goods-type')
	}
	
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询商品类型'})
	@ApiParam({
		name:'id',
		description:'类型的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.goodsTypeService.findById(id,'goods-type')
	}
	
}

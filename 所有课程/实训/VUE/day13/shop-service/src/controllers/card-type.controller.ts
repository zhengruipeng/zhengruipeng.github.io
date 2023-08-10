import { Controller,Put,Header,Delete, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { CardTypeService } from '../services/card-type.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { CardType } from '../entity/card-type.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("卡类型接口")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("/card-type")
export class CardTypeController {
  constructor(private readonly cardTypeService: CardTypeService) {}
	
	@Get('/list/all')
	@ApiOperation({summary:'获取所有的卡类型'})
	findAll():ResultData{
		return this.cardTypeService.findAll('card-type')
	}
	@Get('/list/page')
	@ApiOperation({summary:'分页获取所有的卡类型'})
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
		return this.cardTypeService.findForPageByExample(pno,psize,name,remark,'card-type')
	}
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据id删除卡类型'})
	deleteById(@Param('id') id:string):ResultData{
		return this.cardTypeService.deleteById(id,'card-type')
	}
	@Put('/insert')
	@ApiOperation({summary:'新增卡类型'})
	insert(@Body() cardType:CardType):ResultData{
		cardType.insertTime = new Date().getTime()
		return this.cardTypeService.insertOne(cardType,'card-type')
	}
	
	@Put('/update')
	@ApiOperation({summary:'修改卡类型'})
	update(@Body() cardType:CardType):ResultData{
		return this.cardTypeService.updateOne(cardType,'card-type')
	}
	
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询卡类型'})
	@ApiParam({
		name:'id',
		description:'类型的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.cardTypeService.findById(id,'card-type')
	}
	
}

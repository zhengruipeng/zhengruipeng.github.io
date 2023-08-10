import { Controller,Put,Header,Delete, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { CardService } from '../services/card.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { CardMultiple } from '../entity/card-multiple.entity'
import { Card } from '../entity/card.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("会员卡接口")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("/card")
export class CardController {
  constructor(private readonly cardService: CardService) {}
	
	
	@Get('/list/page')
	@ApiOperation({summary:'分页获取所有的会员卡'})
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
		description:'会员卡名称（模糊查询）',
		example:'大米',
		required:false
	})
	@ApiQuery({
		name:'cardTypeId',
		description:'会员卡类型id',
		example:'1',
		required:false
	})
	@ApiQuery({
		name:'num',
		description:'卡片编号'
	})
	findForPage(
		@Query('pno') pno:number = 1,
		@Query('psize') psize:number = 10,
		@Query('name') name:string, 
		@Query('num') num:string, 
		@Query('cardTypeId') cardTypeId:number ):ResultData{
		return this.cardService.
			findForPageByExample(
				pno,
				psize,
				name,
				num,
				cardTypeId,'card')
	}
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据id删除会员卡'})
	deleteById(@Param('id') id:string):ResultData{
		return this.cardService.deleteById(id,'card')
	}
	@Put('/insert')
	@ApiOperation({summary:'新增会员卡'})
	insert(@Body() card:Card):ResultData{
		let cardType = this.cardService.findById(card.cardTypeId+'','card-type').getData;
		if(cardType.id){
			card.insertTime = new Date().getTime()
			card.status = 0;
			card = this.cardService.initCardNum(card);
			return this.cardService.insertOne(card,'card')
		}else{
			return ResultData.end(500,{},'卡类型不存在')
		}
		
	}
	
	@Put('/update')
	@ApiOperation({summary:'修改会员卡'})
	update(@Body() card:Card):ResultData{
		return this.cardService.updateOne(card,'card')
	}
	
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询会员卡'})
	@ApiParam({
		name:'id',
		description:'的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.cardService.findById(id,'card')
	}
	@Put("/insert/multiple")
	@ApiOperation({summary:'批量创建会员卡接口'})
	insertMultiple(@Body() cardMultiple:CardMultiple):ResultData{
		return this.cardService.insertMultiple(cardMultiple)
	}
	@Get("/open/card")
	@ApiOperation({summary:'开卡接口'})
	@ApiQuery({
		name:'num',
		description:'卡片编号'
	})
	@ApiQuery({
		name:'userId',
		description:'用户id'
	})
	openCard(@Query('num') num:string,@Query('userId') userId:string):ResultData{
		return this.cardService.openCard(num,userId);
	}
	
	@Get("/back/card")
	@ApiOperation({summary:'退卡接口'})
	@ApiQuery({
		name:'num',
		description:'卡片编号'
	})
	backCard(@Query('num') num:string):ResultData{
		return this.cardService.backCard(num);
	}
	
	@Get("/find/num")
	@ApiOperation({summary:'根据卡号查询会员卡'})
	@ApiQuery({
		name:'num',
		description:'卡片编号'
	})
	findByNum(@Query('num') num:string):ResultData{
		return this.cardService.findByNum(num);
	}
}

import { Controller,Put,Header,Delete, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { NewsTypeService } from '../services/news-type.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { NewsType } from '../entity/news-type.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("新闻类型接口")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("/news-type")
export class NewsTypeController {
  constructor(private readonly newsTypeService: NewsTypeService) {}
	
	@Get('/list/all')
	@ApiOperation({summary:'获取所有的新闻类型'})
	findAll():ResultData{
		return this.newsTypeService.findAll('news-type')
	}
	@Get('/list/page')
	@ApiOperation({summary:'分页获取所有的新闻类型'})
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
		return this.newsTypeService.findForPageByExample(pno,psize,name,remark,'news-type')
	}
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据id删除新闻类型'})
	deleteById(@Param('id') id:string):ResultData{
		return this.newsTypeService.deleteById(id,'news-type')
	}
	@Put('/insert')
	@ApiOperation({summary:'新增新闻类型'})
	insert(@Body() newsType:NewsType):ResultData{
		newsType.insertTime = new Date().getTime()
		return this.newsTypeService.insertOne(newsType,'news-type')
	}
	
	@Put('/update')
	@ApiOperation({summary:'修改新闻类型'})
	update(@Body() newsType:NewsType):ResultData{
		return this.newsTypeService.updateOne(newsType,'news-type')
	}
	
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询新闻类型'})
	@ApiParam({
		name:'id',
		description:'类型的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.newsTypeService.findById(id,'news-type')
	}
	
}

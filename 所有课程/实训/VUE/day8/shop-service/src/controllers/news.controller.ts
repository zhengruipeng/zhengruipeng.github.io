import { Controller,Put,Header,Delete,Req, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { ResultData} from '../utils/ResultData';
import {Request} from 'express'
import { AuthGuard } from '@nestjs/passport'
import { News } from '../entity/news.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("新闻接口")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("/news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
	
	
	@Get('/list/page')
	@ApiOperation({summary:'分页获取所有的新闻'})
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
		description:'新闻标题（模糊查询）',
		example:'大米',
		required:false
	})
	@ApiQuery({
		name:'newsTypeId',
		description:'新闻类型id',
		example:'1',
		required:false
	})
	findForPage(
		@Query('pno') pno:number = 1,
		@Query('psize') psize:number = 10,
		@Query('name') name:string, 
		@Query('newsTypeId') newsTypeId:number ):ResultData{
		return this.newsService.
			findForPageByExample(
				pno,
				psize,
				name,
				newsTypeId,'news')
	}
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据id删除新闻'})
	deleteById(@Param('id') id:string):ResultData{
		return this.newsService.deleteById(id,'news')
	}
	@Put('/insert')
	@ApiOperation({summary:'新增新闻'})
	insert(@Body() news:News,@Req() req:Request):ResultData{
		console.log(req.headers['authorization'])
		let token = req.headers['authorization'];
		let user = this.newsService.getAdminUserByToken(token)
		if(user){
			news.author = user.nickname
		}
		news.insertTime = new Date().getTime()
		return this.newsService.insertOne(news,'news')
	}
	
	@Put('/update')
	@ApiOperation({summary:'修改新闻'})
	update(@Body() news:News):ResultData{
		return this.newsService.updateOne(news,'news')
	}
	
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询新闻'})
	@ApiParam({
		name:'id',
		description:'的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.newsService.findById(id,'news')
	}
	
	
}

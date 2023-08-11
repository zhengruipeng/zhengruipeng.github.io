import { Controller,Put,Header,Delete,Req, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { ShopUserService } from '../services/shop-user.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { ShopUser } from '../entity/shop-user.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("会员接口")
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller("/shop-user")
export class ShopUserController {
  constructor(private readonly shopUserService: ShopUserService) {}
	
	
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
	@ApiQuery({
		name:'username',
		description:'会员账号（模糊）',
		example:'test',
		required:false
	})
	@ApiQuery({
		name:'phone',
		description:'会员手机号（模糊）',
		example:'18988888888',
		required:false
	})
	@ApiQuery({
		name:'freeze',
		description:'会员状态 1冻结，0正常',
		example:'1',
		required:false
	})
	@ApiQuery({
		name:'beginTime',
		description:'起始时间,格式要求yyyy-MM-dd',
		example:'2020-01-01',
		required:false
	})
	@ApiQuery({
		name:'endTime',
		description:'终止时间,格式要求yyyy-MM-dd',
		example:'2020-10-10',
		required:false
	})
	@ApiQuery({
		name:'hasCard',
		description:'用户是否绑定会员卡（0，未绑定，1，已绑定）',
		example:'0/1',
		required:false
	})
	findForPage(
		@Query('pno') pno:number = 1,
		@Query('psize') psize:number = 10,
		@Query('username') username:string, 
		@Query('phone') phone:string,
		@Query('freeze') freeze:number,
		@Query('beginTime') beginTime:string = '',
		@Query('endTime') endTime:string = '',
		@Query('hasCard') hasCard:number):ResultData{
		return this.shopUserService.
			findForPageByExample(
				pno,
				psize,
				username,
				phone,
				freeze,
				beginTime,
				endTime,
				hasCard,'shop-user')
	}
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据id删除会员'})
	deleteById(@Param('id') id:string):ResultData{
		return this.shopUserService.deleteById(id,'shop-user')
	}
	@Put('/insert')
	@ApiOperation({summary:'新增会员'})
	insert(@Body() shopUser:ShopUser):ResultData{
		shopUser.insertTime = new Date().getTime()
		shopUser.birthday = new Date(shopUser.birthday).getTime()+''
		shopUser.freeze = 0
		return this.shopUserService.insertOne(shopUser,'shop-user')
	}
	
	@Put('/update')
	@ApiOperation({summary:'修改会员'})
	update(@Body() shopUser:ShopUser):ResultData{
		shopUser.birthday = new Date(shopUser.birthday).getTime()+''
		return this.shopUserService.updateOne(shopUser,'shop-user')
	}
	
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询会员'})
	@ApiParam({
		name:'id',
		description:'的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.shopUserService.findById(id,'shop-user')
	}
	
	@Get('/set/freeze')
	@ApiOperation({summary:'设置会员的冻结和解冻'})
	@ApiQuery({
		name:'id',
		description:'会员id'
	})
	@ApiQuery({
		name:'freeze',
		description:'会员状态，0正常，1冻结'
	})
	setFreeze(@Query('id') id:string,@Query('freeze') freeze:number):ResultData{
		return this.shopUserService.setFreeze(id,freeze,'shop-user')
	}
	
	@Put('/add/like/:id')
	@ApiOperation({summary:'会员收藏商品'})
	@ApiParam({
		name:'id',
		description:'商品的id'
	})
	addLike(@Param("id") id:string,@Req() request:any):ResultData{
		let token = request.headers['authorization']
		return this.shopUserService.addLike(id,token)
	}
	
	@Delete('/delete/like/:id')
	@ApiOperation({summary:'删除收藏商品'})
	@ApiParam({
		name:'id',
		description:'商品的id'
	})
	deleteLike(@Param("id") id:string,@Req() request:any):ResultData{
		let token = request.headers['authorization']
		return this.shopUserService.deleteLike(id,token)
	}
	
	@Get('/like/list')
	@ApiOperation({summary:'分页获取会员收藏列表'})
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
	getLikeList(
		@Query('pno') pno:number = 1,
		@Query('psize') psize:number = 10,
		@Req() request:any):ResultData{
		let token = request.headers['authorization']
		return this.shopUserService.getLikeList(pno,psize,token)
	}
}

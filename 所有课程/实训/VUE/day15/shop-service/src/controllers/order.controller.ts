import { Controller,Put,Header,Delete, Req,Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { Order } from '../entity/order.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("订单接口")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("/order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
	
	
	@Get('/list/page')
	@ApiOperation({summary:'分页获取所有的订单'})
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
		name:'phone',
		description:'购买人电话',
		example:'大米',
		required:false
	})
	@ApiQuery({
		name:'status',
		description:'订单类型',
		example:'1',
		required:false
	})
	findForPage(
		@Query('pno') pno:number = 1,
		@Query('psize') psize:number = 10,
		@Query('phone') phone:string, 
		@Query('status') status:number):ResultData{
		return this.orderService.
			findForPageByExample(
				pno,
				psize,
				phone,
				status,'order')
	}
	@Delete('/delete/id/:id')
	@ApiOperation({summary:'根据id删除订单'})
	deleteById(@Param('id') id:string):ResultData{
		return this.orderService.deleteById(id,'order')
	}
	@Put('/insert')
	@ApiOperation({summary:'新增订单'})
	insert(@Body() order:Order,@Req() req:any):ResultData{
		order.insertTime = new Date().getTime()
		let token = req.headers['authorization']
		return this.orderService.insert(order,token,'order')
	}
	
	
	@Get('/find/id/:id')
	@ApiOperation({summary:'根据id查询订单'})
	@ApiParam({
		name:'id',
		description:'的id'
	})
	findById(@Param('id') id:string):ResultData{
		return this.orderService.findById(id,'order')
	}
	
	@Get('/send')
	@ApiOperation({summary:'添加物流编号'})
	@ApiQuery({
		name:'id',
		description:'订单id'
	})
	@ApiQuery({
		name:'postCode',
		description:'物流编号'
	})
	send(@Query('id') id:string,@Query('postCode') postCode:string):ResultData{
		return this.orderService.send(id,postCode,'order')
	}
	
	@Get('/recive')
	@ApiOperation({summary:'确认收货'})
	@ApiQuery({
		name:'id',
		description:'订单id'
	})
	recive(@Query('id') id:string,@Query('postCode') postCode:string):ResultData{
		return this.orderService.recive(id,'order')
	}
}

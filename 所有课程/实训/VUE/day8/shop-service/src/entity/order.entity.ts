import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class Order{
	
	@ApiProperty({
	  description: 'id',
		example:'001（新增不需要传）',
	})
	id:string;
	
	@ApiProperty({
	  description: '用户id',
		example:'（新增和修改不需要传）',
	})
	userId:string;
	
	@ApiProperty({
	  description: '手机号',
		example:'（新增和修改不需要传）',
	})
	phone:string;
	
	@ApiProperty({
	  description: '购买人昵称',
		example:'（新增和修改不需要传）',
	})
	nickname:string;
	
	@ApiProperty({
	  description: '密码',
		example:'',
	})
	password:string;
	
	@ApiProperty({
	  description: '商品id',
		example:'',
	})
	goodsId:string;
	
	@ApiProperty({
	  description: '商品名',
		example:'',
	})
	name:string;
	
	@ApiProperty({
	  description: '购买数量',
		example:'',
	})
	num:number;
	
	@ApiProperty({
	  description: '商品单价',
		example:'',
	})
	singlePrice:number;
	
	@ApiProperty({
	  description: '商品原单价',
		example:'',
	})
	singlePriceOld:number;

	@ApiProperty({
	  description: '商品折扣',
		example:'',
	})
	zheKou:number;
	
	@ApiProperty({
	  description: '商品总价',
		example:'',
	})
	totalPrice:number;

	@ApiProperty({
	  description: '订单状态',
		example:'1:已支付，2:已发货，3:确认收货',
	})
	status:number

	@ApiProperty({
	  description: '详细地址',
		example:'xxxx街道xxx小区',
	})
	address:string;
	
	@ApiProperty({
	  description: '物流单号（增加修改都不需要传）',
		example:'xxxx街道xxx小区',
	})
	postCode:string;
	
	@ApiProperty({
	  description: '订单时间（时间戳格式不需要传）',
		example:'',
	})
	insertTime:number;

	
}
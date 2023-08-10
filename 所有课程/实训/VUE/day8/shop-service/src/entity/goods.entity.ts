import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class Goods{
	
	@ApiProperty({
	  description: '商品id（增加时不需要传）',
		example:'1',
	})
	id:number;
	@ApiProperty({
	  description: '商品名称',
		example:'大米',
	})
	name:string;
	
	
	@ApiProperty({
	  description: '商品价格',
		example:'100',
	})
	price:number;
	
	
	@ApiProperty({
	  description: '商品折扣（只能在1-10之间，10为不打折）',
		example:'10',
	})
	zheKou:number;
	
	@ApiProperty({
	  description: '商品类型id',
		example:'1',
	})
	goodsTypeId:number;
	
	@ApiProperty({
	  description: '商品库存，列表页面展示',
		example:'100',
	})
	count:number;
	
	@ApiProperty({
	  description: '是否上架，（1为上架，0为下架），新增和修改不需要传，查询列表中使用',
		example:'1',
	})
	isOnSale:number;
	
	@ApiProperty({
	  description: '商品的logo图片',
		example:'/public/shop/logo.png',
	})
	logo:string;
	
	@ApiProperty({
	  description: '商品的详情图片，最多传3张，列表页面不需要展示',
		example:`['/public/shop/logo.png','/public/shop/logo1.png']`,
	})
	pics:Array<string>
	
	@ApiProperty({
	  description: '商品的详细描述',
		example:'五常大米是东北最好吃的大米',
	})
	description:string;
	
	
	@ApiProperty({
	  description: '商品备注',
		example:'备注',
	})
	remark:string;
	
	
	
	insertTime:number;
	
}
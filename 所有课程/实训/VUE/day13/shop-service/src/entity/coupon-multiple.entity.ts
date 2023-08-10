import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class CouponMultiple{
	
	@ApiProperty({
	  description: '优惠券id（增加时不需要传）',
		example:'1',
	})
	id:number;
	@ApiProperty({
	  description: '优惠券名称',
		example:'',
	})
	name:string;
	@ApiProperty({
	  description: '创建优惠券的张数',
		example:'',
	})
	count:number;
	
	@ApiProperty({
	  description: '优惠券类型id',
		example:'',
	})
	couponTypeId:string;
	@ApiProperty({
	  description: '优惠券价值，如当为现金券时为该券的价格，当为满减券时为券的减免金额',
		example:'',
	})
	price:number;
	@ApiProperty({
	  description: '优惠券价值，如当为现金券时为该券的实际价值比如88元抵100，这个字段为100，当为满减券时为券的门槛价',
		example:'',
	})
	totalPrice:number;
	
	@ApiProperty({
	  description: '优惠券的截止日期，超过截止日期优惠券会被作废',
		example:'',
	})
	targetTime:string;
	
	@ApiProperty({
	  description: '优惠券的状态，0是未分配，1为已领取 创建修改不需要传',
		example:'',
	})
	status:number;
	
	@IsNotEmpty()
	@ApiProperty({
	  description: '优惠券备注',
		example:'',
	})
	remark:string;
	
	insertTime:number;
	
}
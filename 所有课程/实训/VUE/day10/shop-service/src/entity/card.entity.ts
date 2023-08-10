import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class Card{
	
	@ApiProperty({
	  description: '卡id（增加时不需要传）',
		example:'1',
	})
	id:number;
	@ApiProperty({
	  description: '卡名称',
		example:'大米',
	})
	name:string;
	
	
	@ApiProperty({
	  description: '卡类型id',
		example:'100',
	})
	cardTypeId:number;
	
	
	@ApiProperty({
	  description: '卡编号(编号是自动生成的不需要传)',
		example:'HY-BM-00000001',
	})
	num:string;
	
	
	@ApiProperty({
	  description: '卡的logo图片',
		example:'/public/shop/logo.png',
	})
	logo:string;
	
	
	@ApiProperty({
	  description: '卡备注',
		example:'备注',
	})
	remark:string;
	
	@ApiProperty({
	  description: '卡状态（0，未使用，1，已发卡）增加和修改不需要传',
		example:'0',
	})
	status:number;
	
	insertTime:number;
	
}
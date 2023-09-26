import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class CardMultiple{
	
	@ApiProperty({
	  description: '卡名称',
		example:'限量会员卡',
	})
	name:string;
	
	@ApiProperty({
	  description: '卡类型id',
		example:'100',
	})
	cardTypeId:number;
	
	
	@ApiProperty({
	  description: '建卡数量',
		example:'100',
	})
	count:number;
	
	
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

	
}
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class CardType{
	
	@IsNotEmpty()
	@ApiProperty({
	  description: '卡类型id（增加时不需要传）',
		example:'1',
	})
	id:number;
	@IsNotEmpty()
	@ApiProperty({
	  description: '卡类型名称',
		example:'手机数码',
	})
	name:string;
	
	@IsNotEmpty()
	@ApiProperty({
	  description: '卡类型编码(必须是大写字母，要求表单验证)',
		example:'SM',
	})
	bm:string;
	
	@IsNotEmpty()
	@ApiProperty({
	  description: '卡类型备注',
		example:'备注',
	})
	remark:string;
	
	insertTime:number;
	
}
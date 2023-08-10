import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class UserType{
	
	@IsNotEmpty()
	@ApiProperty({
	  description: '会员类型id（增加时不需要传）',
		example:'1',
	})
	id:number;
	@IsNotEmpty()
	@ApiProperty({
	  description: '会员类型名称',
		example:'手机数码',
	})
	name:string;
	
	@IsNotEmpty()
	@ApiProperty({
	  description: '会员类型备注',
		example:'备注',
	})
	remark:string;
	
	insertTime:number;
	
}
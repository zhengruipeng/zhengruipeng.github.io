import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class UserStatus{
	
	@IsNotEmpty()
	@ApiProperty({
	  description: '员工状态id（增加时不需要传）',
		example:'1',
	})
	id:number;
	@IsNotEmpty()
	@ApiProperty({
	  description: '员工状态名称',
		example:'科技',
	})
	name:string;
	
	@IsNotEmpty()
	@ApiProperty({
	  description: '员工状态备注',
		example:'备注',
	})
	remark:string;
	
	insertTime:number;
	
}
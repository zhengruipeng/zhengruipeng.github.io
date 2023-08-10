import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class UserParam {
	@IsNotEmpty()
	@ApiProperty({
	  description: '用户名',
		example:'admin',
	})
	username:string;
	@IsNotEmpty()
	@ApiProperty({
	  description: '密码',
		example:'123456',
	})
	password:string;
}
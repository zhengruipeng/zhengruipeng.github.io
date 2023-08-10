import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class Role{
	
	@IsNotEmpty()
	@ApiProperty({
	  description: '角色的id',
		example:'1',
	})
	id:number;
	@IsNotEmpty()
	@ApiProperty({
	  description: '角色名',
		example:'admin',
	})
	name:string;
	
	insertTime:number;
	
}
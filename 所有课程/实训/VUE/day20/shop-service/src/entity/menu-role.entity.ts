import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class MenuRole{
	@ApiProperty({
	  description: '菜单id的数组',
		example:[1,2,3],
	})
	ids:Array<any>
	@ApiProperty({
	  description: '角色id',
		example:1,
	})
	roleId:string
}
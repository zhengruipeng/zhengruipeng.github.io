import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class Ids{
	@ApiProperty({
	  description: 'id数组',
		example:[1,2,3],
	})
	ids:Array<any>
}
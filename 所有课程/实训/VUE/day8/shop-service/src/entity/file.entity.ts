import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class FileType{
	
	@ApiProperty({
	  description: '存储到哪个文件夹,默认为face',
		example:'face',
		required:false
	})
	folder:string;
	
	@ApiProperty({
	  description: '存储的文件对象',
		example:'File',
		required:true
	})
	file:string;
	
}
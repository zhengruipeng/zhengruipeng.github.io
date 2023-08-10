import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class Dept{
	
	@ApiProperty({
	  description: 'id',
		example:'001（新增不需要传）',
	})
	id:string;
	
	@ApiProperty({
	  description: '部门名称',
		example:'研发部门',
	})
	name:string;
	
	@ApiProperty({
	  description: '部门简介',
		example:'这是部门的简介',
	})
	description:string;
	
	@ApiProperty({
	  description: '部门备注',
		example:'这是部门的备注',
	})
	remark:string;
		
}
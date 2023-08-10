import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class Assets{
	
	@ApiProperty({
	  description: 'id',
		example:'001（新增不需要传）',
	})
	id:string;
	
	@ApiProperty({
	  description: '用户id',
		example:'（新增和修改不需要传）',
	})
	userId:string;
	
	@ApiProperty({
	  description: '省编码',
		example:'230001',
	})
	provinceId:string;
	
	@ApiProperty({
	  description: '省名称',
		example:'黑龙江（新增和修改不需要传）',
	})
	province:string;
	
	@ApiProperty({
	  description: '市编码',
		example:'230002',
	})
	cityId:number;
	
	@ApiProperty({
	  description: '市名称',
		example:'哈尔滨（新增和修改不需要传）',
	})
	city:string;
	
	
	@ApiProperty({
	  description: '区编码',
		example:'230003',
	})
	areaId:number;
	
	@ApiProperty({
	  description: '区名称',
		example:'南岗区（新增和修改不需要传）',
	})
	area:string;
	
	@ApiProperty({
	  description: '详细地址',
		example:'xxxx街道xxx小区',
	})
	address:string;
	
	
	@ApiProperty({
	  description: '是否是默认地址',
		example:'1/0 1为默认地址 0为其他地址',
	})
	default:number;

	
}
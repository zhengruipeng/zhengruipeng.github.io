import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class CheckOutPosition{
	
	@ApiProperty({
	  description: 'id',
		example:'001（新增不需要传）',
	})
	id:string;
	
	@ApiProperty({
	  description: '国家',
		example:'中国',
	})
	nation:string;
	
	@ApiProperty({
	  description: '上班时间（时间戳）',
		example:'',
	})
	beginTime:string;

	@ApiProperty({
	  description: '下班时间（时间戳）',
		example:'',
	})
	endTime:string;

	@ApiProperty({
	  description: '省名称',
		example:'黑龙江（新增和修改不需要传）',
	})
	province:string;
	
	
	
	@ApiProperty({
	  description: '市名称',
		example:'哈尔滨（新增和修改不需要传）',
	})
	city:string;
	
	
	
	
	@ApiProperty({
	  description: '区名称',
		example:'南岗区（新增和修改不需要传）',
	})
	district:string;
	
	@ApiProperty({
	  description: '纬度',
		example:'40.3232',
	})
	lat:number;
	
	@ApiProperty({
	  description: '经度',
		example:'126.3232',
	})
	lng:number;
	
	@ApiProperty({
	  description: '半径（公里）',
		example:'1.5',
	})
	r:number;
	

	
}
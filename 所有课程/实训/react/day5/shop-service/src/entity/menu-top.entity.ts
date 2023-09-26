import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class MenuTop{
	@ApiProperty({
	  description: '菜单id(只有修改操作需要传)',
		example:'1',
		required:false
	})
	id:Number
	
	@ApiProperty({
	  description: '菜单名称',
		example:'系统设置',
	})
	name:string
	@ApiProperty({
	  description: '菜单图标',
		example:'el-icon-user',
	})
	icon:string
	@ApiProperty({
	  description: '菜单路由（增加子菜单时传，增加主菜单不需要传）',
		example:'/amdin',
		required:false
	})
	url:string
}
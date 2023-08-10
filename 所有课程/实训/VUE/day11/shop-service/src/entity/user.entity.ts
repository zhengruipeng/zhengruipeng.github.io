import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class User{
	
	@IsNotEmpty()
	@ApiProperty({
	  description: '用户的id(在新增模块不需要传id)',
		example:'1',
	})
	id:number;
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
	
	@IsNotEmpty()
	@ApiProperty({
	  description: '部门id',
		example:'001（新增修改不需要传）',
	})
	deptId:string;
	
	@IsNotEmpty()
	@ApiProperty({
	  description: '角色id',
		example:'1',
		default:'1'
	})
	roleId:string;
	@ApiProperty({
	  description: '用户昵称',
		example:'管理员',
		default:'管理员'
	})
	nickname:string;
	@ApiProperty({
	  description: '用户头像地址',
		example:'/face/face.png',
		default:'/face/face.png'
	})
	face:string;
	
	insertTime:number;
	
}
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiTags , ApiParam, ApiProperty,ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class ShopUser{
	
	@ApiProperty({
	  description: '会员id（增加时不需要传）',
		example:'1',
	})
	id:number;
	
	@ApiProperty({
	  description: '会员账号',
		example:'test',
	})
	username:string;
	
	@ApiProperty({
	  description: '会员密码',
		example:'123456',
	})
	password:string;
	
	@ApiProperty({
	  description: '会员昵称',
		example:'小明',
	})
	nickname:string;
	
	@ApiProperty({
	  description: '会员类型id',
		example:'1',
	})
	userTypeId:number;
	
	@ApiProperty({
	  description: '会员生日格式要求为yyyy-MM-dd',
		example:'2020-02-02',
	})
	birthday:string;
	
	@ApiProperty({
	  description: '性别，1为男，2为女',
		example:'1',
	})
	sex:number;
	
	@ApiProperty({
	  description: '手机号码',
		example:'18945051918',
	})
	phone:string;
	
	@ApiProperty({
	  description: '会员卡号（增加修改模块不需要使用）',
		example:1601881834420,
	})
	cardNumber:string;
	
	@ApiProperty({
	  description: '头像',
		example:'/public/user/face.png',
	})
	face:string;
	
	coupons:Array<any>
	
	@ApiProperty({
	  description: '用户状态，是否冻结？1冻结，0正常（新增和修改不需要传）',
		example:0,
	})
	freeze:number;
	
	insertTime:number;
	
}
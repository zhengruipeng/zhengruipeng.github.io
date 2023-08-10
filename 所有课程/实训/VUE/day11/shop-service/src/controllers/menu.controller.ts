import { Controller,Put,Header,Delete, Get,Post,Query,Body,UseGuards,Param } from '@nestjs/common';
import { MenuService } from '../services/menu.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { MenuRole } from '../entity/menu-role.entity'
import { MenuTop } from '../entity/menu-top.entity'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("菜单接口")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("/menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
	
	@Post('/list/all/role/:roleId')
	@ApiOperation({summary:'根据用户的角色id获取菜单列表'})
	@ApiParam({
		name:'roleId',
		description:'用户的角色id',
		example:'1'
	})
	findAllByRoleId(@Param("roleId") roleId:string):ResultData{
		return this.menuService.findAllByRoleId(roleId)
	}
	@Get('/list/all')
	@ApiOperation({summary:'获取所有菜单'})
	findAllMenu():ResultData{
		return this.menuService.findAll('menu');
	}
	@Post('/insert/menu-role')
	@ApiOperation({summary:'增加角色菜单的依赖关系'})
	insertRoleMenu(@Body() menuRole:MenuRole):ResultData{
		console.log(menuRole)
		return this.menuService.insertMenuRole(menuRole);
	}
	@Put('/insert')
	@ApiOperation({summary:'增加主菜单'})
	insert(@Body() menuTop:MenuTop):ResultData{
		menuTop.id = new Date().getTime();
		return this.menuService.insertTopMenu(menuTop);
	}
	
	@Put('/insert/pid/:pid')
	@ApiOperation({summary:'增加子菜单主菜单'})
	@ApiParam({
		name:'pid',
		description:'当前新增菜单的父级菜单id'
	})
	insertChild(@Body() menuTop:MenuTop,@Param('pid') pid:string):ResultData{
		menuTop.id = new Date().getTime();
		return this.menuService.insertChildMenu(menuTop,pid);
	}
	@Put('/update')
	@ApiOperation({summary:'修改主菜单'})
	update(@Body() menuTop:MenuTop):ResultData{
		return this.menuService.updateTopMenu(menuTop);
	}
	@Put('/update/child')
	@ApiOperation({summary:'修改子菜单'})
	updateChild(@Body() menuTop:MenuTop):ResultData{
		return this.menuService.updateChildMenu(menuTop);
	}
	@Get('/find/id/:id')
	findById(@Param('id') id:string):ResultData{
		return this.menuService.findById(id);
		
	}
	@Delete('/delete/id/:id')
	deleteById(@Param('id') id:string):ResultData{
		return this.menuService.deleteOneById(id);
	}
}

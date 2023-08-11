import { Controller,Get,Post,Query,Body,UseGuards,UploadedFile,UseInterceptors } 
from '@nestjs/common'
import {FileType} from '../entity/file.entity'
import { FileInterceptor} from '@nestjs/platform-express'
import { FileService } from '../services/file.service';
import { ResultData} from '../utils/ResultData';
import { AuthGuard } from '@nestjs/passport'
import { ApiTags ,ApiOperation,ApiBearerAuth,ApiBody,ApiPropertyOptional, ApiParam, ApiProperty, ApiQuery, ApiHeader} from '@nestjs/swagger';
@ApiTags("文件接口")
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller("/file")
export class FileController {
  constructor(private readonly fileService: FileService) {}
	
	
	@Post('upload/test')
	@ApiOperation({summary:'无鉴权文件上传接口(contentType为multipart/form-data)'})
	@UseInterceptors(FileInterceptor('file'))
	upload(@UploadedFile() file,@Body() body:FileType):ResultData{
		return this.fileService.upload(file,body)
	}
	
	@Post('upload')
	@UseGuards(AuthGuard('jwt'))
	@ApiOperation({summary:'有鉴权文件上传接口(contentType为multipart/form-data)'})
	@UseInterceptors(FileInterceptor('file'))
	upload1(@UploadedFile() file,@Body() body:FileType):ResultData{
		return this.fileService.upload(file,body)
	}
	
	@Get('delete')
	@ApiOperation({summary:'文件删除接口'})
	@ApiQuery({
		name:'path',
		description:'要删除文件的路径'
	})
	@UseGuards(AuthGuard('jwt'))
	deleteFile(@Query("path") path:string):ResultData{
		return this.fileService.deleteFile(path)
	}
}

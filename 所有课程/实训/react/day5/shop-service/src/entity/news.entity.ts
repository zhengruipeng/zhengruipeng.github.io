import {IsEmail, IsNotEmpty} from 'class-validator';
import {ApiTags, ApiParam, ApiProperty, ApiPropertyOptional, ApiQuery, ApiHeader} from '@nestjs/swagger';

export class News {

    @ApiProperty({
        description: '新闻id（增加时不需要传）',
        example: '1',
    })
    id: number;

    @ApiProperty({
        description: '新闻名称',
        example: '科技',
    })
    name: string;

    @ApiProperty({
        description: '新闻内容',
        example: '备注',
    })
    content: string;

    @ApiProperty({
        description: '新闻logo',
        example: '/public/news/xx.png',
    })
    logo: string;

    author: string;

    @ApiProperty({
        description: '新闻摘要',
        example: '摘要',
    })
    description: string;

    @ApiProperty({
        description: '新闻类型id',
        example: '1',
    })
    newsTypeId: number;

    insertTime: number;

}
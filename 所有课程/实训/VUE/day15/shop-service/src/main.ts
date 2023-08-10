import { NestFactory } from '@nestjs/core';
import * as path from 'path'
import * as serveStatic from 'serve-static'
import { AppModule } from './app.module';
import * as session from 'express-session';
import {RequestInterceptor} from './interceptor/request.interceptor'
// api文档插件
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('shop-service/v1');
	// DocumentBuilder是一个辅助类，有助于结构的基本文件SwaggerModule。它包含几种方法，可用于设置诸如标题，描述，版本等属性。
	const options = new DocumentBuilder()
		.setTitle('拼夕夕商城服务端接口')
		.setDescription('接口包含移动端以及pc端所有可用接口') // 文档介绍
		.setVersion('1.0.0') // 文档版本
		.addBearerAuth()
		// .addTag('拼夕夕商城') // 每个tag标签都可以对应着几个@ApiUseTags('用户,安全') 然后被ApiUseTags注释，字符串一致的都会变成同一个标签下的
		.setBasePath('http://localhost:3000')
		.build();
	// 为了创建完整的文档（具有定义的HTTP路由），我们使用类的createDocument()方法SwaggerModule。此方法带有两个参数，分别是应用程序实例和基本Swagger选项。
	const document = SwaggerModule.createDocument(app, options);
	 // 最后一步是setup()。它依次接受（1）装入Swagger的路径，（2）应用程序实例, （3）描述Nest应用程序的文档。
	SwaggerModule.setup('/api', app, document);
	//设置session
	app.use(session({ secret: 'shop-service', cookie: { maxAge: 60000 }}))
	//设置静态资源路径
	app.use('/public', serveStatic(path.join(__dirname, '../public'), {
		maxAge: '99d',
		extensions: ['jpg', 'jpeg', 'png', 'gif'],
	}));
	app.useGlobalInterceptors(new RequestInterceptor())
  await app.listen(3000);
	
}
bootstrap();

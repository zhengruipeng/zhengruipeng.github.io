import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UserModule} from './modules/user.module'
import { ApiTestModule } from './modules/apitest.module'
import { AuthModule } from './modules/auth.module'
import { MenuModule } from './modules/menu.module'
import { GoodsTypeModule } from './modules/goods-type.module'
import { UserTypeModule } from './modules/user-type.module'
import { NewsTypeModule } from './modules/news-type.module'
import { CardTypeModule } from './modules/card-type.module'
import { FileModule } from './modules/file.module'
import { GoodsModule } from './modules/goods.module'
import { NewsModule } from './modules/news.module'
import { AddressModule } from './modules/address.module'
import { CardModule } from './modules/card.module'
import { OrderModule } from './modules/order.module'
import { CouponModule } from './modules/coupon.module'
import { ShopUserModule } from './modules/shop-user.module'
import { CouponTypeModule } from './modules/coupon-type.module'
import { RoleModule } from './modules/role.module'
import { DeptModule } from './modules/dept.module'
import { UserStatusModule } from './modules/user-status.module'
import { CheckOutModule } from './modules/check-out.module'

import { APP_FILTER} from '@nestjs/core'
import { HttpExceptionFilter} from './exception/http-exception.filter'

@Module({
  imports: [
		UserModule,AuthModule,ApiTestModule,MenuModule,
		RoleModule,GoodsTypeModule,UserTypeModule,
		CardTypeModule,CouponTypeModule,FileModule,
		GoodsModule,NewsTypeModule,ShopUserModule,
		NewsModule,CardModule,CouponModule,AddressModule,OrderModule,
		DeptModule,UserStatusModule,CheckOutModule
	],
  controllers: [AppController],
  providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		}
	]
})
export class AppModule {}

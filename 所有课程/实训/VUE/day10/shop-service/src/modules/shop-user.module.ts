import { Module } from '@nestjs/common';
import { ShopUserController } from '../controllers/shop-user.controller';
import { ShopUserService } from '../services/shop-user.service';
@Module({
  controllers: [ShopUserController],
  providers: [ShopUserService],
})
export class ShopUserModule {}

import { Module } from '@nestjs/common';
import { GoodsController } from '../controllers/goods.controller';
import { GoodsService } from '../services/goods.service';
@Module({
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}

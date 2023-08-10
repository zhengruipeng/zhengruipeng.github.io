import { Module } from '@nestjs/common';
import { GoodsTypeController } from '../controllers/goods-type.controller';
import { GoodsTypeService } from '../services/goods-type.service';
@Module({
  controllers: [GoodsTypeController],
  providers: [GoodsTypeService],
})
export class GoodsTypeModule {}

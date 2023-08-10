import { Module } from '@nestjs/common';
import { CouponTypeController } from '../controllers/coupon-type.controller';
import { CouponTypeService } from '../services/coupon-type.service';
@Module({
  controllers: [CouponTypeController],
  providers: [CouponTypeService],
})
export class CouponTypeModule {}

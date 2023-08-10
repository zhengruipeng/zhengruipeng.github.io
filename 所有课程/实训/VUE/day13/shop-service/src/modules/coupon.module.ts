import { Module } from '@nestjs/common';
import { CouponController } from '../controllers/coupon.controller';
import { CouponService } from '../services/coupon.service';
@Module({
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}

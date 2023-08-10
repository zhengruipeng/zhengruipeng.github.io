import { Module } from '@nestjs/common';
import { CheckOutController } from '../controllers/check-out.controller';
import { CheckOutService } from '../services/check-out.service';
@Module({
  controllers: [CheckOutController],
  providers: [CheckOutService],
})
export class CheckOutModule {}

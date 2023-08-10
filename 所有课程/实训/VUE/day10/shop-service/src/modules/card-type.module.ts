import { Module } from '@nestjs/common';
import { CardTypeController } from '../controllers/card-type.controller';
import { CardTypeService } from '../services/card-type.service';
@Module({
  controllers: [CardTypeController],
  providers: [CardTypeService],
})
export class CardTypeModule {}

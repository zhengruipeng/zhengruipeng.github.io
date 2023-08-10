import { Module } from '@nestjs/common';
import { CardController } from '../controllers/card.controller';
import { CardService } from '../services/card.service';
@Module({
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}

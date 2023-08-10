import { Module } from '@nestjs/common';
import { NewsTypeController } from '../controllers/news-type.controller';
import { NewsTypeService } from '../services/news-type.service';
@Module({
  controllers: [NewsTypeController],
  providers: [NewsTypeService],
})
export class NewsTypeModule {}

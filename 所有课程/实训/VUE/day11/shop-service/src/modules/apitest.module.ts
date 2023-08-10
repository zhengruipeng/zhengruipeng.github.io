import { Module } from '@nestjs/common';
import { ApiTestController } from '../controllers/apitest.controller';
import { ApiTestService } from '../services/apitest.service';
@Module({
  controllers: [ApiTestController],
  providers: [ApiTestService],
})
export class ApiTestModule {}

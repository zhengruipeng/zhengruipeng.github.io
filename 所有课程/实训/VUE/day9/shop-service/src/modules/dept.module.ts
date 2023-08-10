import { Module } from '@nestjs/common';
import { DeptController } from '../controllers/dept.controller';
import { DeptService } from '../services/dept.service';
@Module({
  controllers: [DeptController],
  providers: [DeptService],
})
export class DeptModule {}

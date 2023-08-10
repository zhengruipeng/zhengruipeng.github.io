import { Module } from '@nestjs/common';
import { UserTypeController } from '../controllers/user-type.controller';
import { UserTypeService } from '../services/user-type.service';
@Module({
  controllers: [UserTypeController],
  providers: [UserTypeService],
})
export class UserTypeModule {}

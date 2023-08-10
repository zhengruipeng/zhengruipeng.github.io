import { Module } from '@nestjs/common';
import { AddressController } from '../controllers/address.controller';
import { AddressService } from '../services/address.service';
@Module({
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}

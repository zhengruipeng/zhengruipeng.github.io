import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { UserModule } from '../modules/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthService,UserService, JwtStrategy],
})
export class AuthModule {}
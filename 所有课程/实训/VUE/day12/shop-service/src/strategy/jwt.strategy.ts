import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ResultData} from '../utils/ResultData';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'shop-service',
    });
  }

  validate(payload: any, done: Function) {
    const user = this.authService.validateUser(payload);
    if (!user) {
      done(ResultData.end(401,{},"未授权请求"), false);
    }
    done(null, user);
  }
}
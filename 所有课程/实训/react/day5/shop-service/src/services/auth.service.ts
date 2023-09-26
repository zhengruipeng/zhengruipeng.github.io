import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';


/**
 * 鉴权服务
 */
@Injectable()
export class AuthService{
  constructor(private readonly userService: UserService) {}

  createToken(user:any) {
    return jwt.sign(user, 'shop-service', { expiresIn: 36000 });
  }

  validateUser(payload: any): boolean {
    return this.userService.checkLogin(payload.username,payload.password); 
  }
}
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext,next: CallHandler,): Observable<any>{
		let ctx = context.switchToHttp()
		let request = ctx.getRequest()
		return next.handle().pipe(map(data => data),
    );
  }
}
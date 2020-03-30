
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler, NotFoundException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  // @TODO Implement all error responses
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => throwError(new NotFoundException(err.message))),
      );
  }
}

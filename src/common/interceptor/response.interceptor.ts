import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { APIResult } from '../types/index.js';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  APIResult<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<APIResult<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          data,
        };
      }),
    );
  }
}

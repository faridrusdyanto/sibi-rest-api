// transform.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (Array.isArray(data)) {
          return data.map(item => this.transformResponse(item));
        } else {
          return this.transformResponse(data);
        }
      }),
    );
  }

  private transformResponse(data: any): any {
    // Menghilangkan properti 'password' dari objek
    if (data && data.password) {
      delete data.password;
    }
    return data;
  }
}

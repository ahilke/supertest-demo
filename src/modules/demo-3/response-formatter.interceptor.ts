import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs/operators";

export interface Response<T> {
    data: T;
}

@Injectable()
export class ResponseFormatterInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(map((data) => ({})));
    }
}

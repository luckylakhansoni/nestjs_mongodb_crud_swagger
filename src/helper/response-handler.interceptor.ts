import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Messages } from "./constant/message";

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseHandlerInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode;
        const code = statusCode ? statusCode : 500;
        switch (code) {
          case 200:
            response.message = Messages.REQUEST_SUCCESS;
            break;
          case 201:
            response.message = Messages.DATA_CREATED;
            break;
          case 404:
            response.message = Messages.NOT_FOUND;
            break;
          case 400:
            response.message = Messages.BAD_REQUEST;
            break;
          case 500:
            response.message = Messages.SERVER_ERROR;
            break;
          default:
            break;
        }
        response.status(code);
        return {
          statusCode: code,
          message: response.message,
          data,
        };
      }),
    );
  }
}

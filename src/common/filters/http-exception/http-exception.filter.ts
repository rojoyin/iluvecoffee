import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException) // in parentheses a list of exceptions we want to catch
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp(); // get request or response objects of the current http context
    const response = context.getResponse<Response>();
    const status = exception.getStatus(); // get response status
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object); // error returned must be an object

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}

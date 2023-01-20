import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Protocol = createParamDecorator(
  (defaultProtocol: string, ctx: ExecutionContext) => {
    console.log(defaultProtocol);
    // in defaultProtocol argument you find any values that the invoker passes
    const request = ctx.switchToHttp().getRequest();
    return request.protocol;
  },
);

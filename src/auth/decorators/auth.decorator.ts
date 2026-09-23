import { Inject, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const SESSION_STORE = Symbol('SESSION_STORE');
export const InjectSessionStore = () => Inject(SESSION_STORE);

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.session.userId;
  },
);

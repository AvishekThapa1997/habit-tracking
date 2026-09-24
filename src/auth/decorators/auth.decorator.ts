import {
  createParamDecorator,
  ExecutionContext,
  Inject,
  SetMetadata,
} from '@nestjs/common';
import { REQUIRE_AUTH, SESSION_STORE } from '../constants/auth.constants.js';
import type { AuthRequest } from '../types/index.js';

export const InjectSessionStore = () => Inject(SESSION_STORE);

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    const userId = request.session.userId;
    return userId;
  },
);

export const Auth = (requireAuth: boolean = true) => {
  return SetMetadata(REQUIRE_AUTH, requireAuth);
};

export const Public = () => {
  return Auth(false);
};

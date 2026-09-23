import type { UserDto } from '@/users/dto/user.dto.js';
import 'express-session';

type APIError = {
  message: string;
  code?: number;
};

export type APIResult<D> =
  | {
      success: true;
      data: D;
      message?: string;
    }
  | {
      success: false;
      error: APIError;
    };

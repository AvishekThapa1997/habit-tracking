import type { UserDto } from '@/users/dto/user.dto.js';
import 'express-session';
import type { SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: UserDto['id'];
  }
}

export interface UserSession extends SessionData {
  userId?: UserDto['id'];
}

export interface AuthRequest extends Request {
  session: UserSession;
}

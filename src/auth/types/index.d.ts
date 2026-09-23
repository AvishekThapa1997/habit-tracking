import type { UserDto } from '@/users/dto/user.dto.js';
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: UserDto['id'];
  }
}


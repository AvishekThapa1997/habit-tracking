import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { PasswordService } from './providers/password.service.js';
import { SessionStoreService } from './providers/session.store.js';
import { SESSION_STORE } from './decorators/auth.decorator.js';
import { AuthController } from './auth.controller.js';

@Module({
  providers: [
    AuthService,
    PasswordService,
    {
      provide: SESSION_STORE,
      useClass: SessionStoreService,
    },
  ],
  exports: [AuthService, PasswordService, SESSION_STORE],
  controllers: [AuthController],
})
export class AuthModule {}

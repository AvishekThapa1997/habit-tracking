import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { PasswordService } from './providers/password.service.js';
import { SessionStoreService } from './providers/session.store.js';
import { AuthController } from './auth.controller.js';
import { SESSION_STORE } from './constants/auth.constants.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guards.js';

@Module({
  providers: [
    AuthService,
    PasswordService,
    {
      provide: SESSION_STORE,
      useClass: SessionStoreService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService, PasswordService, SESSION_STORE],
  controllers: [AuthController],
})
export class AuthModule {}

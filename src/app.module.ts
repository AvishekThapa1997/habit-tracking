import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller.js';
import { AppService } from '@src/app.service.js';
import { AppConfigModule } from '@src/config/config.module.js';
import { UsersModule } from '@src/users/users.module.js';
import { HabitsModule } from '@src/habits/habits.module.js';
import { DbModule } from './db/db.module.js';
import { SeedModule } from './seed/seed.module.js';
import { RedisModule } from './redis/redis.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    HabitsModule,
    DbModule,
    SeedModule,
    RedisModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

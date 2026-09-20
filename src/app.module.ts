import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller.js';
import { AppService } from '@src/app.service.js';
import { AppConfigModule } from '@src/config/config.module.js';
import { UsersModule } from '@src/users/users.module.js';
import { HabitsModule } from '@src/habits/habits.module.js';

@Module({
  imports: [AppConfigModule, UsersModule, HabitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

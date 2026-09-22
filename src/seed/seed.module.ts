import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller.js';
import { SeedService } from './seed.service.js';
import { DbModule } from '@/db/db.module.js';
import { AuthModule } from '@/auth/auth.module.js';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [DbModule, AuthModule],
})
export class SeedModule {}

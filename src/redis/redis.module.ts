import { Global, Module } from '@nestjs/common';
import { Redis } from '@upstash/redis';
import { AppConfigService } from '@/config/config.service.js';
import { REDIS_CLIENT } from './redis.constants.js';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        const url = appConfigService.get('UPSTASH_REDIS_REST_URL');
        const token = appConfigService.get('UPSTASH_REDIS_REST_TOKEN');
        return new Redis({ url, token });
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}

import { Global, Module } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { AppConfigService } from '@/config/config.service.js';
import { relations } from './relations/index.js';

export const DB_PROVIDER = Symbol('DB_PROVIDER');
export type Db = ReturnType<typeof drizzle<typeof relations>>;

@Global()
@Module({
  providers: [
    {
      provide: DB_PROVIDER,
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        const DATABASE_URL = appConfigService.get('DATABASE_URL');
        const sql = neon(DATABASE_URL);
        const db = drizzle({ client: sql, relations });
        return db;
      },
    },
  ],
  exports: [DB_PROVIDER],
})
export class DbModule {}

import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from 'src/config/schema/index.js';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      async validate(config) {
        const { data, error, success } = envSchema.safeParse(config);
        if (success) {
          return data;
        }
        console.error('Failed to environment variables', error);
        // process.exit(1);
      },
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}

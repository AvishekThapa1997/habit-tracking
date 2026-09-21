import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module.js';
import { AppConfigService } from './config/config.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  const appConfig = app.get(AppConfigService);
  const PORT = appConfig.get('PORT');
  await app.listen(PORT ?? 3000);
}
await bootstrap();

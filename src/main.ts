import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module.js';
import { AppConfigService } from './config/config.service.js';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptor/response.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  const appConfig = app.get(AppConfigService);
  const PORT = appConfig.get('PORT');
  await app.listen(PORT ?? 3000);
}
await bootstrap();

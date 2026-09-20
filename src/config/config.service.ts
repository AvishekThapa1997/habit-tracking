import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from 'src/config/schema/index.js';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get<T>(key: keyof Env) {
    return this.configService.get<T>(key);
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from 'src/config/schema/index.js';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<Env, true>) {}
  get<Key extends keyof Env>(key: Key) {
    return this.configService.get<Env[Key]>(key);
  }
}

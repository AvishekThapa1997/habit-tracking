import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from './validation/env.validation.js';
import EnvironmentVariables from './validation/env.validation.js';

@Injectable()
export class AppConfigService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}
  get<T extends Env>(key: T): EnvironmentVariables[T] {
    return this.configService.get<EnvironmentVariables[T]>(key);
  }
}

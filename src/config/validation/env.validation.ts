/*
NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  APP_STATE: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().positive(),
  DATABASE_URL: z.string().startsWith('postgresql://'),
  JWT_SECRET: z.string().min(32, 'Must be 32 chars long'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),
*
**/

import { Logger } from '@nestjs/common';
import { Expose, plainToInstance, Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  Min,
  validateSync,
} from 'class-validator';
import z from 'zod';

enum Environment {
  Development = 'development',
  Test = 'test',
  Production = 'production',
}
enum AppState {
  Dev = 'dev',
  Stage = 'stage',
  Ephermal = 'ephermal',
  Prod = 'prod',
}

const DEFAULT = {
  PORT: 3000,
  NODE_ENV: Environment.Development,
  APP_STATE: AppState.Dev,
  JWT_EXPIRES_IN: '7d',
  BCRYPT_ROUNDS: 12,
};

export default class EnvironmentVariables {
  @IsEnum(Environment)
  @Expose()
  @Transform(({ value }) => value ?? DEFAULT.NODE_ENV)
  NODE_ENV: Environment;

  @IsEnum(AppState)
  @Expose()
  @Transform(({ value }) => value ?? DEFAULT.APP_STATE)
  APP_STATE: AppState = DEFAULT.APP_STATE;

  @IsNumber()
  @IsPositive()
  @Expose()
  @Transform(({ value }) => value ?? DEFAULT.PORT)
  PORT: number = DEFAULT.PORT;

  @IsString()
  @Expose()
  DATABASE_URL: string;

  @IsString()
  @Expose()
  JWT_SECRET: string;

  @IsString()
  @Transform(({ value }) => value ?? DEFAULT.JWT_EXPIRES_IN)
  @Expose()
  JWT_EXPIRES_IN: string;

  @IsNumber()
  @Transform(({ value }) => value ?? DEFAULT.BCRYPT_ROUNDS)
  @Expose()
  BCRYPT_ROUNDS: number = DEFAULT.BCRYPT_ROUNDS;

  @IsString()
  @Expose()
  SESSION_SECRET: string;

  @IsString()
  @Expose()
  UPSTASH_REDIS_REST_URL: string;

  @IsString()
  @Expose()
  UPSTASH_REDIS_REST_TOKEN: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });
  Logger.log(validatedConfig.JWT_SECRET.length);
  const errors = validateSync(validatedConfig);
  if (errors.length > 0) {
    const formattedErrors = errors.map((error) => {
      return { property: error.property, error: error.constraints };
    });
    Logger.error('Envrionemnt variable missing', formattedErrors);
    process.exit(1);
  }
  return validatedConfig;
};

export type Env = keyof EnvironmentVariables;

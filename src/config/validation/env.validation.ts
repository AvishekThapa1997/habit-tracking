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
import { plainToInstance } from 'class-transformer';
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
  NODE_ENV: Environment = DEFAULT.NODE_ENV;

  @IsEnum(AppState)
  APP_STATE: AppState = DEFAULT.APP_STATE;

  @IsNumber()
  @IsPositive()
  PORT: number = DEFAULT.PORT;

  @IsString()
  @Matches('/^postgresql:\/\//')
  DATABASE_URL: string;

  @IsString()
  @Min(32)
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRES_IN: string = DEFAULT.JWT_EXPIRES_IN;

  @IsNumber()
  BCRYPT_ROUNDS: number = DEFAULT.BCRYPT_ROUNDS;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

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

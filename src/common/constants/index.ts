import type { Env } from 'src/config/schema/index.js';

export const ENV_VARIABLE: Record<keyof Env, string> = {
  APP_STATE: 'APP_STATE',
  BCRYPT_ROUNDS: 'BCRYPT_ROUNDS',
  DATABASE_URL: 'DATABASE_URL',
  JWT_EXPIRES_IN: 'JWT_EXPIRES_IN',
  JWT_SECRET: 'JWT_SECRET',
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',
};

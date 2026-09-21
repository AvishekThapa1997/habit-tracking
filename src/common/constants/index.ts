import { envSchema } from 'src/config/schema/index.js';

export const ENV_VARIABLE = envSchema.keyof().enum;

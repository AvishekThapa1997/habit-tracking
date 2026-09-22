import { Inject } from '@nestjs/common';
import { DB_PROVIDER } from './db.module.js';

export const InjectDb = () => Inject(DB_PROVIDER);

import { integer, timestamp } from 'drizzle-orm/pg-core';

export const commonColumns = {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
};

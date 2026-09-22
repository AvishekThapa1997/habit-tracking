import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { commonColumns } from '../common-columns.js';
import { habits } from './habits.js';
import { tags } from './tags.js';

export const habitTags = pgTable(
  'habit_tags',
  {
    ...commonColumns,
    habitId: integer('habit_id').notNull().references(() => habits.id, {
      onDelete: 'cascade',
      name: 'fk_habit_tags_id',
    }),
    tagId: integer('tag_id').notNull().references(() => tags.id, {
      onDelete: 'cascade',
      name: 'fk_tag_id',
    }),
  },
  (table) => {
    return [primaryKey({ columns: [table.habitId, table.tagId] })];
  },
);

export type HabitTag = InferSelectModel<typeof habitTags>;
export type InsertHabitTag = InferInsertModel<typeof habitTags>;

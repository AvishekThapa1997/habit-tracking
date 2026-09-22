import { defineRelations } from 'drizzle-orm';
import { entries } from '../schema/entries.js';
import { habits } from '../schema/habits.js';

export const habitEntriesRelation = defineRelations(
  { habits, entries },
  (builder) => {
    return {
      habits: {
        entries: builder.many.entries({
          from: builder.habits.id,
          to: builder.entries.habitId,
        }),
      },
      entries: {
        habit: builder.one.habits({
          from: builder.entries.habitId,
          to: builder.habits.id,
          optional: false,
        }),
      },
    };
  },
);

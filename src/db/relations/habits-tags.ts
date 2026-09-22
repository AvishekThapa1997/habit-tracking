import { defineRelations } from 'drizzle-orm';
import { habits } from '../schema/habits.js';
import { tags } from '../schema/tags.js';

export const habitsTagRelations = defineRelations(
  { habits, tags },
  (builder) => {
    return {
      habits: {
        tags: builder.many.tags({
          from: builder.habits.id,
          to: builder.tags.id,
        }),
      },
      tags: {
        habits: builder.many.habits({
          from: builder.tags.id,
          to: builder.habits.id,
        }),
      },
    };
  },
);

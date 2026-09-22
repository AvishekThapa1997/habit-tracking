import { defineRelations } from 'drizzle-orm';
import { users } from '../schema/users.js';
import { habits } from '../schema/habits.js';

export const userHabitsRelation = defineRelations(
  { users, habits },
  (builder) => {
    return {
      users: {
        habits: builder.many.habits({
          from: builder.users.id,
          to: builder.habits.userId,
        }),
      },
      habits: {
        user: builder.one.users({
          from: builder.habits.userId,
          to: builder.users.id,
          optional: false,
        }),
      },
    };
  },
);

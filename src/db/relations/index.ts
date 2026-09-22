import { defineRelations } from 'drizzle-orm';
import { users } from '../schema/users.js';
import { habits } from '../schema/habits.js';
import { entries } from '../schema/entries.js';
import { tags } from '../schema/tags.js';
import { habitTags } from '../schema/habits-tags.js';

export const relations = defineRelations(
  { users, habits, entries, tags, habitTags },
  (builder) => ({
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
      entries: builder.many.entries({
        from: builder.habits.id,
        to: builder.entries.habitId,
      }),
      habitTags: builder.many.habitTags({
        from: builder.habits.id,
        to: builder.habitTags.habitId,
      }),
    },
    entries: {
      habit: builder.one.habits({
        from: builder.entries.habitId,
        to: builder.habits.id,
        optional: false,
      }),
    },
    tags: {
      habitTags: builder.many.habitTags({
        from: builder.tags.id,
        to: builder.habitTags.tagId,
      }),
    },
    habitTags: {
      habit: builder.one.habits({
        from: builder.habitTags.habitId,
        to: builder.habits.id,
        optional: false,
      }),
      tag: builder.one.tags({
        from: builder.habitTags.tagId,
        to: builder.tags.id,
        optional: false,
      }),
    },
  }),
);

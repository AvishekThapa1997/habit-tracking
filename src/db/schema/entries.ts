import { index, pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { commonColumns } from "../common-columns.js";
import { habits } from "./habits.js";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const entries = pgTable("entries", {
    ...commonColumns,
    habitId: integer("habit_id").notNull().references(() => habits.id, { onDelete: 'cascade', name: "fk_habit_entries_id" }),
    completetionDate: timestamp('completion_date').defaultNow().notNull(),
    note: text('note')
}, (table) => {
    return [
        index('idx_habit_entries').on(table.habitId)
    ]
})

export type Entry = InferSelectModel<typeof entries>
export type InsertEntry = InferInsertModel<typeof entries>
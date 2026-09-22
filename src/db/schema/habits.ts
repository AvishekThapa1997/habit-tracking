import { boolean, index, integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { commonColumns } from "../common-columns.js";
import { users } from "./users.js";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";


export const frequency = pgEnum("frequency", ["daily", "weekly", "monthly"]);
export const habits = pgTable("habits", {
    ...commonColumns,
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade', name: "fk_user_habits_id" }),
    name: varchar("name", { length: 256 }).notNull(),
    description: varchar("description", { length: 1024 }).notNull(),
    frequency: frequency("frequency").default('daily').notNull(),
    targetCount: integer('target_count').notNull().default(1),
    isActive: boolean('is_active').notNull().default(true)
}, (table) => {
    return [
        index('idx_user_habits').on(table.userId)
    ]
})

export type InsertHabit = InferInsertModel<typeof habits>
export type Habit = InferSelectModel<typeof habits>
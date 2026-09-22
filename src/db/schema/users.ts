import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { commonColumns } from "../common-columns.js";

export const users = pgTable("users", {
    ...commonColumns,
    userName: varchar("user_name", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),

})

export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

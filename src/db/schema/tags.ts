import { pgTable, varchar } from "drizzle-orm/pg-core";
import { commonColumns } from "../common-columns.js";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const tags = pgTable("tags", {
    ...commonColumns,
    name: varchar("name", { length: 256 }).notNull().unique(),
    color: varchar('color', { length: 7 }).notNull().default("#6b7280"),

})



export type Tag = InferSelectModel<typeof tags>
export type InsertTag = InferInsertModel<typeof tags>

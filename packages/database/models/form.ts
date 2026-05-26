import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    boolean,
    text,
} from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { relations } from "drizzle-orm";
import { formFieldsTable } from "./form-field";
import { responsesTable } from "./response";

export const formsTable = pgTable("forms", {
    id: uuid("id").primaryKey().defaultRandom(),

    title: varchar("title", { length: 80 }).notNull(),
    description: text("description").notNull(),

    slug: varchar("slug", { length: 120 }).notNull().unique(),
    visibility: varchar("visibility", { length: 20 }).default("unlisted").notNull(),
    published: boolean("published").default(false).notNull(),

    theme: varchar("theme", { length: 80 }).default("default").notNull(),
    creatorId: uuid("creator_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date())
})

export const formRelations = relations(formsTable, ({ many, one }) => ({
    fields: many(formFieldsTable),
    responses: many(responsesTable),
    creator: one(usersTable, {
        fields: [formsTable.creatorId],
        references: [usersTable.id]
    })
}))

export type SelectForm = typeof formsTable.$inferSelect;
export type InsertForm = typeof formsTable.$inferInsert;
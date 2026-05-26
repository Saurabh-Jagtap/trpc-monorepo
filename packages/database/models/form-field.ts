import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  integer,
  jsonb
} from "drizzle-orm/pg-core";
import { formsTable } from "./form";
import { relations } from "drizzle-orm";

export const formFieldsTable = pgTable("form_fields", {
  id: uuid("id").primaryKey().defaultRandom(),

  formId: uuid("form_id").notNull().references(() => formsTable.id, { onDelete: "cascade" }),

  // stable core columns
  type: varchar("type", { length: 20 }).notNull(),
  label: varchar("label", { length: 80 }).notNull(),
  placeholder: varchar("placeholder", { length: 120 }),
  required: boolean("required").default(false).notNull(),
  order: integer("order").notNull(),

  // flexible metadata
  config: jsonb("config").default({}).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date())
})


export const formFieldRelations = relations(formFieldsTable, ({ one }) => ({
  form: one(formsTable, {
    fields: [formFieldsTable.formId],
    references: [formsTable.id]
  })
}))

export type SelectFormField = typeof formFieldsTable.$inferSelect;
export type InsertFormField = typeof formFieldsTable.$inferInsert;
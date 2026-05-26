import {
  pgTable,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { formsTable } from "./form";
import { relations } from "drizzle-orm";
import { responseAnswersTable } from "./response-answer";

export const responsesTable = pgTable("responses", {
  id: uuid("id").primaryKey().defaultRandom(),

  formId: uuid("form_id").notNull().references(() => formsTable.id, { onDelete: "cascade" }),
  respondentEmail: varchar("respondent_email", { length: 255 }),

  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
})


export const responseRelations = relations(responsesTable, ({ many, one }) => ({
  form: one(formsTable, {
    fields: [responsesTable.formId],
    references: [formsTable.id]
  }),
  answers: many(responseAnswersTable)
}))

export type SelectResponse = typeof responsesTable.$inferSelect;
export type InsertResponse = typeof responsesTable.$inferInsert;
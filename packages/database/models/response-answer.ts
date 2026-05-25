import {
    pgTable,
    uuid,
    timestamp,
    text,
} from "drizzle-orm/pg-core";
import { responsesTable } from "./response";
import { formFieldsTable } from "./form-field";
import { relations } from "drizzle-orm";

export const responseAnswersTable = pgTable("response_answers", {
    id: uuid("id").primaryKey().defaultRandom(),
    responseId: uuid("response_id").notNull().references(() => responsesTable.id),

    fieldId: uuid("field_id").notNull().references(() => formFieldsTable.id),
    value: text("value").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
})


export const responseAnswerRelations = relations(responseAnswersTable, ({ one }) => ({
    response: one(responsesTable, {
        fields: [responseAnswersTable.responseId],
        references: [responsesTable.id]
    }),
    field: one(formFieldsTable, {
        fields: [responseAnswersTable.fieldId],
        references: [formFieldsTable.id]
    })
}))

export type SelectResponseAnswer = typeof responseAnswersTable.$inferSelect;
export type InsertResponseAnswer = typeof responseAnswersTable.$inferInsert;
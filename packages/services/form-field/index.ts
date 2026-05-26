import db from "@repo/database";
import { formFieldsTable, type InsertFormField } from "@repo/database/schema";

export async function addFormField(data: InsertFormField) {
    const [formFields] = await db
        .insert(formFieldsTable)
        .values(data)
        .returning()

    return formFields;
}
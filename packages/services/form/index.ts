import db from "@repo/database";
import { formsTable, type InsertForm } from "@repo/database/schema";

export async function createForm(data: InsertForm) {
    const [form] = await db
        .insert(formsTable)
        .values(data)
        .returning()

    return form;
}

export async function getFormById(formId: string) {
    const form = await db.query.formsTable.findFirst({
        where: (forms, { eq }) => eq(forms.id, formId),
        with: { fields: true }
    })

    return form;
}
import db from "@repo/database";
import { InsertResponse, InsertResponseAnswer, responseAnswersTable, responsesTable } from "@repo/database/schema";

export async function submitResponse(data: InsertResponse) {
    const [response] = await db
        .insert(responsesTable)
        .values(data)
        .returning()

    if (!response) {
        throw new Error("Failed to create response");
    }

    return response;
}

export async function responseAnswers(data: InsertResponseAnswer[]) {
    const responseAnswer = await db
        .insert(responseAnswersTable)
        .values(data)
        .returning()

    return responseAnswer;
}
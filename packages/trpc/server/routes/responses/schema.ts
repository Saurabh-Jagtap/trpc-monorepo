import z from "zod";

export const responsesSchema = z.object({
    formId: z.string(),
    respondentEmail: z.string().optional(),
    answers: z.array(
        z.object(
            {
                fieldId: z.string(),
                value: z.string()
            }
        )
    )
})

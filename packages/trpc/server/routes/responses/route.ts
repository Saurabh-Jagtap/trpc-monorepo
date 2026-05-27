import { responseAnswers, submitResponse } from "@repo/services";
import { publicProcedure, router } from "../../trpc";
import { responsesSchema } from "./schema";

export const submitResponseRouter = router({
    create: publicProcedure
        .input(responsesSchema)
        .mutation(async ({ input }) => {
            const responseData = {
                formId: input.formId,
                respondentEmail: input.respondentEmail ?? null
            }
            const responses = await submitResponse(responseData)

            const responseAnswerData = input.answers.map((answer) => (
                {
                    ...answer,
                    responseId: responses.id
                }
            ))

            const responseAnswer = await responseAnswers(responseAnswerData)

            console.log(input)
            console.log(responseAnswerData)
            return responseAnswer
        }),
})
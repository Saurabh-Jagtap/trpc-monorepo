import { addFormField } from "@repo/services";
import { publicProcedure, router } from "../../trpc";
import { addFormFieldSchema } from "./schema";

export const formFieldRouter = router({
    create: publicProcedure
    .input(addFormFieldSchema)
    .mutation(async ({input})=>{
        const formFields = await addFormField(input)
        return formFields
    })
})
import { createFormSchema } from './schema';
import { publicProcedure, router } from '../../trpc'
import { createForm } from '@repo/services'

export const formRouter = router({
    create: publicProcedure
    .input(createFormSchema)
    .mutation(async ({input}) =>{
        const form = await createForm({
            ...input,
            slug: crypto.randomUUID(),
            creatorId: '63394de0-da64-4882-9afb-f1290d34abd0'
        });
        return form;
    })
})
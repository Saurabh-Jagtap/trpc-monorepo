import { createFormSchema } from './schema';
import { publicProcedure, router } from '../../trpc'
import { createForm, getFormById } from '@repo/services'
import z from 'zod';

export const formRouter = router({
    create: publicProcedure
        .input(createFormSchema)
        .mutation(async ({ input }) => {
            const form = await createForm({
                ...input,
                slug: crypto.randomUUID(),
                creatorId: '63394de0-da64-4882-9afb-f1290d34abd0'
            });
            return form;
        }),
    getFormById: publicProcedure
        .input(z.object({
            formId: z.string().uuid(),
        }))
        .query(async ({ input }) => {
            const form = await getFormById(input.formId)
            return form
        })
})
import {z} from 'zod'

export const createFormSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(5),
    visibility: z.enum(["public", "unlisted"]),
    theme: z.string()
})
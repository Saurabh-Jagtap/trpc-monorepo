import {uuid, z} from 'zod'

export const addFormFieldSchema = z.object({
    formId: z.uuid(),
    type: z.enum(["text", "email", "number", "select", "checkbox", "rating", "date"]),
    label: z.string().min(3),
    placeholder: z.string().optional(),
    required: z.boolean(),
    order: z.number(),

    config: z.record(z.string() ,z.any()).optional()
})
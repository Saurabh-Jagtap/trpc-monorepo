"use client"

import { useState } from "react"
import { trpc } from "~/trpc/client"
import type { RouterOutputs } from "@repo/trpc/client"

type Form = RouterOutputs["forms"]["create"];

export default function TestPage() {
    const [form, setForm] = useState<Form | null>(null)

    const createFormMutation = trpc.forms.create.useMutation()
    const addFieldMutation = trpc.formFields.create.useMutation()
    const formQuery = trpc.forms.getFormById.useQuery(
        { formId: form?.id ?? '' },
        { enabled: false },  // !!form
    )

    async function handleCreateForm() {
        try {
            const response = await createFormMutation.mutateAsync({
                title: "Anime survey",
                description: "Favourite anime voting form",
                visibility: 'public',
                theme: "naruto",
            })
            setForm(response)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    async function handleAddField() {
        try {
            if (!form) return;

            const response = await addFieldMutation.mutateAsync({
                formId: form?.id,
                type: 'text',
                label: 'Enter your favourite anime',
                placeholder: 'Anime name',
                required: false,
                order: 1
            })

            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    async function handleGetForm() {
        if(!form) return
        try {
            await formQuery.refetch()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <button onClick={handleCreateForm}>
                Create Form
            </button>

            <button onClick={handleAddField}>
                Add field
            </button>

            <button onClick={handleGetForm}>
                get Form
            </button>

            {formQuery.data?.fields.map((field) => (
                <div key={field.id}>
                    {field.label}
                </div>
            ))}
        </>
    )
}
"use client"

import { useState } from "react"
import { trpc } from "~/trpc/client"
import type { RouterOutputs } from "@repo/trpc/client"
import { RenderField } from "../component/RenderField";
import { json } from "zod";

type Form = RouterOutputs["forms"]["create"];

export default function TestPage() {
    const [form, setForm] = useState<Form | null>(null)
    const [answers, setAnswers] = useState<Record<string, string>>({})

    const createFormMutation = trpc.forms.create.useMutation()
    const addFieldMutation = trpc.formFields.create.useMutation()
    const formQuery = trpc.forms.getFormById.useQuery(
        { formId: form?.id ?? '' },
        { enabled: !!form },
    )
    const submitMutation = trpc.responses.create.useMutation()

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
                order: 1,
                // config: { options: ["Naruto", "One Piece", "COTE"] }
            })
            await formQuery.refetch()
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    async function handleSubmit() {
        const arrAnswers = Object.entries(answers)
        const transformedAnswers = arrAnswers.map(([fieldId, value]) => (
            { fieldId, value }
        ))

        const payload = {
            "formId": form?.id ?? '',
            "answers": transformedAnswers
        }

        const submitResponse = await submitMutation.mutateAsync(payload)

        console.log(submitResponse)
    }

    // console.log(answers)
    return (
        <>
            <button onClick={handleCreateForm}>
                Create Form
            </button>
            <br></br>
            <button onClick={handleAddField}>
                Add field
            </button>
            <br></br>
            <button onClick={handleSubmit}>
                Submit
            </button>

            {formQuery.data?.fields.map((field) => (
                <div key={field.id}>
                    <RenderField
                        field={field}
                        answers={answers}
                        setAnswers={setAnswers}
                    />
                </div>
            ))}
        </>
    )
}
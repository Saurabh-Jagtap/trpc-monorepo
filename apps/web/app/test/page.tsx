"use client"

import { trpc } from "~/trpc/client"

export default function TestPage() {
    const createFormMutation = trpc.forms.create.useMutation()

    async function handleCreateForm() {
        try {
            const response = await createFormMutation.mutateAsync({
                title: "Anime survey",
                description: "Favourite anime voting form",
                visibility: 'public',
                theme: "naruto",
            })
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <button onClick={handleCreateForm}>
                Create Form
            </button>
        </>
    )
}
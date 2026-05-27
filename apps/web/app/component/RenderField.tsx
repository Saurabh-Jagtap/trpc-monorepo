import { RouterOutputs } from "@repo/trpc/client";

type FetchedForm = NonNullable<RouterOutputs["forms"]["getFormById"]>;
type Field = FetchedForm["fields"][number];
type Answers = Record<string, string>;
type RenderFieldProps = {
    field: Field;
    answers: Answers;
    setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
}

export function RenderField({ field, answers, setAnswers }: RenderFieldProps) {
    switch (field.type) {
        case "text":
            return <input 
            value={answers[field.id] ?? ""}
            onChange={(e)=>{
                setAnswers((prev)=>({
                    ...prev,
                    [field.id]: e.target.value
                }))
            }}
            />
        case "select":
            return <select>
                {field.config.options?.map((option, index) => (<option key={index} value={option}>{option}</option>))}
            </select>
        case "textarea":
            return <textarea />
    }
}
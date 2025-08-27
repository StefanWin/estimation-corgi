'use server';

import {z} from 'zod';
import {suggestMessage as suggestMessageDB} from '@/db'
import {redirect} from "next/navigation";

const isNotUrl = z
    .string()
    .max(72)
    .regex(
        /^(?!https?:\/\/\S+$).*$/,
        "String must not be a URL",
    );

const inputSchema = z.object({
    message: isNotUrl,
    suggestedBy: isNotUrl.optional().nullable(),
})

export async function suggestMessage(formData: FormData) {

    let result = 'success';

    try {
        const fd = z.instanceof(FormData).parse(formData);
        const fdObj = Object.entries(fd.entries());

        const {
            message,
            suggestedBy
        } = inputSchema.parse(fdObj);

        await suggestMessageDB(
            message,
            suggestedBy ?? null,
        );
    } catch (err: unknown) {
        result = 'error';
        console.error(err);
    }

    redirect(`/suggest?result=${result}`);
}
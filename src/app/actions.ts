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

export async function suggestMessage(formData: FormData) {
    const message = formData.get('message');
    const suggestedBy = formData.get('suggestedBy');

    let result = 'success';

    try {
        await suggestMessageDB(
            isNotUrl.parse(message),
            suggestedBy ? isNotUrl.parse(suggestedBy) : null,
        );
    } catch (err: unknown) {
        result = 'error';
        console.error(err);
    }

    redirect(`/suggest?result=${result}`);
}
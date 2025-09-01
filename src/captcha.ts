import {z} from "zod";

const verifySchema = z.object({
    success: z.boolean(),
    'error-codes': z.array(z.string()).optional(),
});

export const verifyTurnstile = async (token: string) => {
    const res = await fetch('/api/cf-turnstile-verify', {
        method: 'POST',
        body: JSON.stringify({token}),
        headers: {
            'content-type': 'application/json'
        }
    })

    const data = await res.json();

    return verifySchema.parse(data);
}
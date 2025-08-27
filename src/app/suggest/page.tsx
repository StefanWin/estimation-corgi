'use client';

import styles from './suggest.module.css';
import {Button} from "@/components/button";
import {suggestMessage} from "@/app/actions";
import {useSearchParams} from "next/navigation";
import NextLink from "next/link";
import {Turnstile} from '@marsidev/react-turnstile'
import {Suspense, useState} from "react";
import {z} from 'zod';
import {env} from "@/env";

const verifySchema = z.object({
    success: z.boolean(),
    'error-codes': z.array(z.string()).optional(),
});

function Suggest() {
    const query = useSearchParams();
    const result = query.get('result');

    const [error, setError] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState<boolean>(false);

    const verifyTurnstile = async (token: string) => {
        const res = await fetch('/api/cf-turnstile-verify', {
            method: 'POST',
            body: JSON.stringify({token}),
            headers: {
                'content-type': 'application/json'
            }
        })

        const data = await res.json();

        const {
            data: parsedData,
        } = verifySchema.safeParse(data);

        if (parsedData?.success) {
            setIsVerified(true);
        } else {
            setError(parsedData?.["error-codes"]?.join(' ') ?? 'unknown error');
        }

    }

    if (result) {
        return (
            <div className={styles.container}>
                <NextLink href={`/`}>
                    <h1>estimation corgi</h1>
                </NextLink>
                <p>{result === 'success' ? 'successfully added your suggestion ✅' : 'there was an error adding your suggestion ❌'}</p>
                <NextLink href={'/'}>home</NextLink>
            </div>
        )
    }


    const turnStileKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    return (
        <div className={styles.container}>
            <NextLink href={`/`}>
                <h1>estimation corgi</h1>
            </NextLink>
            <form className={styles.form} action={suggestMessage}>
                <input className={styles.input} type="text" name="message" placeholder='message (max 72 characters)'
                       required/>
                <input className={styles.input} type="text" name="suggestedBy" placeholder='your name (optional)'/>
                {
                    turnStileKey && (
                        <Turnstile
                            siteKey={turnStileKey}
                            onSuccess={(token) => {
                                void verifyTurnstile(token);
                            }}
                        />
                    )
                }
                {
                    error && (
                        <p className={styles.error}>error validating turnstile: {error}</p>
                    )
                }
                {
                    isVerified && <Button type="submit" label='suggest'/>
                }
            </form>
        </div>
    )
}

export default function SuggestPage() {
    return (
        <Suspense>
            <Suggest/>
        </Suspense>
    )
}
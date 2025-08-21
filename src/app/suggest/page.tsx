'use client';

import styles from './suggest.module.css';
import {Button} from "@/components/button";
import {suggestMessage} from "@/app/actions";
import {useSearchParams} from "next/navigation";
import NextLink from "next/link";
import {Turnstile} from '@marsidev/react-turnstile'
import {Suspense, useState} from "react";


function Suggest() {
    const query = useSearchParams();
    const result = query.get('result');

    const [isVerified, setIsVerified] = useState<boolean>(false);

    if (result) {
        return (
            <div className={styles.container}>
                <NextLink href={`/`}>
                    <h1>estimation corgi</h1>
                </NextLink>
                <p>{result === 'success' ? 'successfully added your suggestion' : 'there was an error adding your suggestion'}</p>
                <NextLink href={'/'}>home</NextLink>
            </div>
        )
    }

    const turnStileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    if (!turnStileKey) {
        console.error(`turnstile site key is missing`);
    }

    return (
        <div className={styles.container}>
            <NextLink href={`/`}>
                <h1>estimation corgi</h1>
            </NextLink>
            <form className={styles.form} action={suggestMessage}>
                <input className={styles.input} type="text" name="message" placeholder='message (max 72 characters)' required/>
                <input className={styles.input} type="text" name="suggestedBy" placeholder='your name (optional)'/>
                {
                    turnStileKey && (
                        <Turnstile
                            siteKey={turnStileKey}
                            onSuccess={() => setIsVerified(true)}
                        />
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
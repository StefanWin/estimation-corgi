import NextImage from "next/image";
import {connection} from 'next/server';
import fatAssCorgi from "../../../public/phatasscorgi.png";
import chillaxCorgi from "../../../public/ChillaxCorgi.png";
import NextLink from "next/link";
import styles from './meta.module.css';
import {getApprovedMessages} from "@/db";


export default async function Meta() {
    await connection();
    const messages = await getApprovedMessages();
    return (
        <>
            <NextLink href={`/`}>
                <h1>estimation corgi</h1>
            </NextLink>
            <h2 className={styles.header}>available messages:</h2>
            <ul className={styles.list}>
                {
                    messages.map(m => (
                        <li key={m.id}>{m.message}</li>
                    ))
                }
            </ul>
            <h2 className={styles.header}>images:</h2>
            <NextImage
                src={fatAssCorgi}
                style={{objectFit: 'contain'}}
                alt="corgi"
                priority
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            />
            <NextImage
                src={chillaxCorgi}
                style={{objectFit: 'contain'}}
                alt="corgi"
                priority
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            />
            <NextLink href={'/'}>home</NextLink>
        </>
    )
}
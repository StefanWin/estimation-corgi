import NextImage from "next/image";
import {connection} from 'next/server';
import fatAssCorgi from "../../../public/phatasscorgi.png";
import chillaxCorgi from "../../../public/ChillaxCorgi.png";
import runningCorgi from "../../../public/running-corgi.png";
import cuteCorgi from "../../../public/cute-corgi.png";
import blepCorgi from "../../../public/blep-corgi.png";
import NextLink from "next/link";
import styles from './meta.module.css';
import {getApprovedMessages} from "@/db";
import Link from "next/link";


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
                alt="chillaxed corgi"
                priority
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            />
            <NextImage
                src={runningCorgi}
                style={{objectFit: 'contain'}}
                alt="running corgi"
                priority
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            />
            <Link
                prefetch={false}
                href="https://www.pngmart.com/image/169777/png/169776"
                target="_blank"
                title="running corgi"
                rel="noopener noreferrer"
            >
                Image Attribution: Corgi, Canine, Breed, Furry, Puppy PNG
            </Link>
            <NextImage
                src={cuteCorgi}
                style={{objectFit: 'contain'}}
                alt="cute corgi"
                priority
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            />
            <Link
                prefetch={false}
                href="https://www.pngmart.com/image/169825/png/169824"
                target="_blank"
                title="running corgi"
                rel="noopener noreferrer"
            >
                Image Attribution: Cute Corgi Dog, Friendly Companion, Fluffy Tail, Playful Pet, Loyal Breed PNG
            </Link>
            <NextImage
                src={blepCorgi}
                style={{objectFit: 'contain'}}
                alt="blep corgi"
                priority
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            />
            <Link
                prefetch={false}
                href="https://www.pngmart.com/image/169829/png/169828"
                target="_blank"
                title="running corgi"
                rel="noopener noreferrer"
            >
                Image Attribution: Cute Corgi Dog, Joyful Pet, Friendly Breed, Fluffy Companion, Charming Pup PNG
            </Link>
        </>
    )
}
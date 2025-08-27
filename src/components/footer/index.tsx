import {FC} from "react";
import styles from './footer.module.css';
import Link from "next/link";

export const Footer: FC = () => (
    <footer className={styles.footer}>
        <Link
            prefetch={false}
            href="http://theestimategoat.com/"
            target="_blank"
            rel="noopener noreferrer"
        >
            inspired by the Estimate Goat
        </Link>
        <Link
            prefetch={false}
            href="https://www.flaticon.com/free-icons/corgi"
            title="corgi icons"
            target="_blank"
            rel="noopener noreferrer"
        >
            Corgi icons created by AomAm - Flaticon
        </Link>
        <Link
            prefetch={false}
            href="https://www.pngmart.com/image/169777/png/169776"
            target="_blank"
            title="running corgi"
            rel="noopener noreferrer"
        >
            Corgi, Canine, Breed, Furry, Puppy PNG
        </Link>
        <Link
            prefetch={false}
            href="https://www.pngmart.com/image/169825/png/169824"
            target="_blank"
            title="running corgi"
            rel="noopener noreferrer"
        >
            Cute Corgi Dog, Friendly Companion, Fluffy Tail, Playful Pet, Loyal Breed PNG
        </Link>
        <Link
            prefetch={false}
            href="https://www.pngmart.com/image/169829/png/169828"
            target="_blank"
            title="running corgi"
            rel="noopener noreferrer"
        >
            Cute Corgi Dog, Joyful Pet, Friendly Breed, Fluffy Companion, Charming Pup PNG
        </Link>
        <Link
            prefetch={false}
            href="https://swinte.dev"
            target="_blank"
            rel="noopener noreferrer"
        >
            made by swinte.dev
        </Link>
    </footer>
)
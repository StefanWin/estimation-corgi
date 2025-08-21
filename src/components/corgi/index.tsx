import styles from './corgi.module.css'
import {FC} from "react";
import Image from "next/image";
import fatAssCorgi from "../../../public/CorgioPhattBoot.png";
import chillaxCorgi from "../../../public/ChillaxCorgi.png";

export const Corgi: FC = () => (
    <Image
        className={styles.image}
        src={Math.random() > 0.5 ? fatAssCorgi : chillaxCorgi}
        alt="corgi"
        priority
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
    />
)
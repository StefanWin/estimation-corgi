import React, {FC} from "react";
import styles from './message.module.css'
import {getRandomNumber} from "@/util";

interface MessageProps {
    message: CorgiMessage;
}

export const Message: FC<MessageProps> = ({message}) => (
    <>
        <p className={styles.duration}>{`${getRandomNumber(1, 40)} hours`}</p>
        <p className={styles.text}>{message.message}</p>
    </>
)
import type { FC } from 'react';
import { getRandomNumber } from '@/util';
import styles from './message.module.css';

interface MessageProps {
	message: string;
}

export const Message: FC<MessageProps> = ({ message }) => (
	<>
		<p className={styles.duration}>{`${getRandomNumber(1, 40)} hours`}</p>
		<p className={styles.text}>{message}</p>
	</>
);

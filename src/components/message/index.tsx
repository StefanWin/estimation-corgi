import type { FC } from 'react';
import styles from './message.module.css';

interface MessageProps {
	message: string;
	displayValue: string | number;
}

export const Message: FC<MessageProps> = ({ message, displayValue }) => {
	return (
		<>
			<p className={styles.duration}>{displayValue}</p>
			<p className={styles.text}>{message}</p>
		</>
	);
};

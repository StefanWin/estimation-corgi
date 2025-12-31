import type { FC } from 'react';
import type { EstimationUnit } from '@/constants';
import { getRandomArrayElement } from '@/util';
import styles from './message.module.css';

interface MessageProps {
	message: string;
	estimationUnit: EstimationUnit;
}

export const Message: FC<MessageProps> = ({ message, estimationUnit }) => {
	const value = getRandomArrayElement(estimationUnit.values);
	const displayValue = estimationUnit.suffix
		? `${value} ${estimationUnit.suffix}`
		: value;

	return (
		<>
			<p className={styles.duration}>{displayValue}</p>
			<p className={styles.text}>{message}</p>
		</>
	);
};

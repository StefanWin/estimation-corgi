'use client';

import type { FC } from 'react';
import styles from './button.module.css';

interface ButtonProps {
	label: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset' | undefined;
}

export const Button: FC<ButtonProps> = ({
	label,
	onClick,
	type = 'button',
}) => {
	return (
		<button
			className={styles.button}
			type={type}
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		>
			{label}
		</button>
	);
};

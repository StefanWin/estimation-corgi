'use client';

import type { FC } from 'react';
import styles from './button.module.css';

interface ButtonProps {
	label: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	isDisabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
	label,
	onClick,
	type = 'button',
	isDisabled = false,
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
			disabled={isDisabled}
		>
			{label}
		</button>
	);
};

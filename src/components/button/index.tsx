'use client';

import type { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
	children,
	className,
	type = 'button',
	...props
}: Readonly<ButtonProps>) {
	return (
		<button
			className={className ? `${styles.button} ${className}` : styles.button}
			type={type}
			{...props}
		>
			{children}
		</button>
	);
}

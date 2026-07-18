'use client';

import MuiButton, { type ButtonProps } from '@mui/material/Button';

export function Button({
	children,
	type = 'button',
	...props
}: Readonly<ButtonProps>) {
	return (
		<MuiButton
			variant="contained"
			color="secondary"
			type={type}
			sx={{
				borderRadius: 999,
				px: 4,
				py: 1.25,
				color: '#fff',
				backgroundImage: 'linear-gradient(135deg, #ff7b4a, #e56a3a)',
				boxShadow: '0 2px 8px rgba(255, 107, 53, 0.2)',
				transition: 'transform 0.2s ease, background 0.2s ease',
				'&:hover': {
					transform: 'translateY(-2px)',
					backgroundImage: 'linear-gradient(135deg, #ff9a70, #ff7b4a)',
					boxShadow: '0 3px 10px rgba(255, 107, 53, 0.25)',
				},
			}}
			{...props}
		>
			{children}
		</MuiButton>
	);
}

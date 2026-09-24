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
				borderRadius: 1,
				px: 4,
				py: 1.25,
				color: '#24211d',
				backgroundColor: 'var(--accent)',
				border: '2px solid var(--ink)',
				boxShadow: '4px 4px 0 var(--shadow)',
				transition: 'transform 0.2s ease, box-shadow 0.2s ease',
				'&:hover': {
					transform: 'translate(2px, 2px)',
					backgroundColor: '#f07b52',
					boxShadow: '2px 2px 0 var(--shadow)',
				},
			}}
			{...props}
		>
			{children}
		</MuiButton>
	);
}

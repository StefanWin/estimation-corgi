'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from '@/components/link';

const buttonStyles = {
	width: { xs: '100%', sm: 'auto' },
	px: 2.25,
	py: 1,
	borderRadius: 999,
	borderColor: 'rgba(139, 124, 247, 0.34)',
	backgroundColor: 'rgba(255, 255, 255, 0.035)',
	color: 'primary.light',
	'&:hover': {
		borderColor: 'primary.light',
		backgroundColor: 'rgba(139, 124, 247, 0.22)',
		color: '#ffffff',
		transform: 'translateY(-2px)',
	},
};

export function NavigationActions() {
	return (
		<Stack
			direction={{ xs: 'column', sm: 'row' }}
			spacing={1.5}
			sx={{
				width: 'min(100%, 42rem)',
				pt: 2.5,
				borderTop: '1px solid rgba(255, 255, 255, 0.08)',
				alignItems: 'stretch',
				justifyContent: 'center',
			}}
		>
			<Button
				LinkComponent={Link}
				href="/suggest"
				variant="outlined"
				sx={buttonStyles}
			>
				suggest a message
			</Button>
			<Button
				LinkComponent={Link}
				href="/meta"
				variant="outlined"
				sx={buttonStyles}
			>
				show available messages &amp; images
			</Button>
		</Stack>
	);
}

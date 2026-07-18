import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface MessageProps {
	message: string;
	displayValue: string | number;
}

export const Message: FC<MessageProps> = ({ message, displayValue }) => {
	return (
		<>
			<Typography
				component="p"
				sx={{
					fontSize: 'clamp(2rem, 1.7rem + 1vw, 2.5rem)',
					fontWeight: 800,
					backgroundImage: 'linear-gradient(135deg, #ff7b4a, #8b7cf7)',
					backgroundClip: 'text',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					lineHeight: 1,
				}}
			>
				{displayValue}
			</Typography>
			<Typography
				component="p"
				sx={{
					mt: 1,
					textAlign: 'center',
					fontWeight: 600,
					fontSize: {
						xs: '1.1rem',
						md: 'clamp(1.05rem, 0.95rem + 0.5vw, 1.25rem)',
					},
					lineHeight: 1.35,
					minHeight: '3.25rem',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					maxWidth: '28ch',
				}}
			>
				{message}
			</Typography>
		</>
	);
};

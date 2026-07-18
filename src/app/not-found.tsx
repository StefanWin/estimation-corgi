import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Link as NextLink } from '@/components/link';
import notFoundImage from '../../public/404.jpg';

export default function NotFound() {
	return (
		<Stack sx={{ alignItems: 'center', gap: 3, py: 2, textAlign: 'center' }}>
			<MuiLink component={NextLink} href="/" underline="none">
				<Typography
					component="h1"
					sx={{
						fontSize: '4rem',
						fontWeight: 800,
						lineHeight: 1,
						backgroundImage: 'linear-gradient(135deg, #ff7b4a, #8b7cf7)',
						backgroundClip: 'text',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
					}}
				>
					estimation corgi
				</Typography>
			</MuiLink>
			<Typography component="h2" variant="h6">
				404 - not found
			</Typography>
			<Box
				component={Image}
				suppressHydrationWarning
				src={notFoundImage}
				alt="corgi"
				priority
				sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
				sx={{
					objectFit: 'contain',
					maxWidth: '100%',
					width: 'auto',
					height: 'auto',
					maxHeight: '40vh',
					borderRadius: 2,
					filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))',
				}}
			/>
			<MuiLink component={NextLink} href="/">
				go home
			</MuiLink>
		</Stack>
	);
}

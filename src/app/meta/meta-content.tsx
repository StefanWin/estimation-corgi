'use client';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import MuiLink from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from 'convex/react';
import { BookCopyIcon } from 'lucide-react';
import NextImage from 'next/image';
import { toast } from 'sonner';
import { Link } from '@/components/link';
import { CORGI_IMAGES } from '@/constants';
import { api } from '../../../convex/_generated/api';

async function copyMessage(message: string) {
	try {
		await navigator.clipboard.writeText(message);
		toast.success('Message copied');
	} catch {
		toast.error('Failed to copy message');
	}
}

export function MetaContent() {
	const messages = useQuery(api.messages.getApprovedMessages);

	return (
		<Stack
			sx={{ alignItems: 'center', gap: 7, width: '100%', maxWidth: 900, py: 2 }}
		>
			<MuiLink component={Link} href="/" color="text.primary">
				<Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
					estimation corgi
				</Typography>
			</MuiLink>

			<Stack component="section" sx={sectionStyles}>
				<Typography component="h2" sx={headerStyles}>
					available messages:
				</Typography>
				<List disablePadding sx={{ width: '100%' }}>
					{messages?.map((m) => (
						<ListItem key={m._id} disablePadding>
							<ButtonBase
								type="button"
								onClick={() => copyMessage(m.message)}
								aria-label={`Copy message: ${m.message}`}
								sx={{
									width: '100%',
									justifyContent: 'space-between',
									gap: 2,
									py: 1.75,
									borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
									fontSize: '0.9rem',
									textAlign: 'left',
									transition: 'color 0.2s ease, border-color 0.2s ease',
									'&:hover': {
										color: 'primary.light',
										borderColor: 'primary.light',
									},
								}}
							>
								<Box component="span" sx={{ flex: 1 }}>
									{m.message} {m.likes ? `(${m.likes} likes)` : ''}
								</Box>
								<BookCopyIcon />
							</ButtonBase>
						</ListItem>
					))}
				</List>
			</Stack>

			<Stack component="section" sx={sectionStyles}>
				<Typography component="h2" sx={headerStyles}>
					images:
				</Typography>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
						width: '100%',
					}}
				>
					{CORGI_IMAGES.map((img, index) => (
						<Stack
							key={img.id}
							sx={{
								...imageWrapperStyles,
								borderRight: {
									xs: 0,
									sm:
										index % 2 === 0 ? '1px solid rgba(255, 255, 255, 0.08)' : 0,
								},
							}}
						>
							<Box
								component={NextImage}
								src={img.src}
								alt={img.alt}
								width={200}
								height={200}
								priority
								sizes="200px"
								sx={{ objectFit: 'contain' }}
							/>
							{img.attribution && (
								<MuiLink
									component={Link}
									prefetch={false}
									href={img.attribution.href}
									target="_blank"
									title={img.attribution.name}
									rel="noopener noreferrer"
									sx={attributionStyles}
								>
									Image Attribution: {img.attribution.name}
								</MuiLink>
							)}
						</Stack>
					))}

					<Stack sx={imageWrapperStyles}>
						<Box
							sx={{
								width: 200,
								height: 200,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<span>🐶</span>
						</Box>
						<MuiLink
							component={Link}
							prefetch={false}
							href="https://www.flaticon.com/free-icons/corgi"
							title="corgi icons"
							target="_blank"
							rel="noopener noreferrer"
							sx={attributionStyles}
						>
							Corgi icons created by AomAm - Flaticon
						</MuiLink>
					</Stack>
				</Box>
			</Stack>

			<MuiLink component={Link} href="/" sx={backLinkStyles}>
				go back
			</MuiLink>
		</Stack>
	);
}

const sectionStyles = {
	width: '100%',
	gap: 3,
	pt: 4,
	borderTop: '1px solid rgba(255, 255, 255, 0.08)',
};

const headerStyles = {
	fontSize: '1.5rem',
	fontWeight: 700,
	backgroundImage: 'linear-gradient(135deg, #ff7b4a, #8b7cf7)',
	backgroundClip: 'text',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
};

const imageWrapperStyles = {
	alignItems: 'center',
	gap: 1.5,
	py: 4,
	px: 2,
	borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
	transition: 'background 0.2s ease',
	'&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.035)' },
};

const attributionStyles = {
	fontSize: '0.75rem',
	color: 'primary.light',
	textAlign: 'center',
	textDecoration: 'none',
	'&:hover': { color: 'primary.main' },
};

const backLinkStyles = {
	mt: 2,
	py: 1,
	borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
	color: 'primary.light',
	fontWeight: 700,
	textDecoration: 'none',
	'&:hover': { color: '#ff9a70', borderColor: '#ff9a70' },
};

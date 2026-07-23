import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as NextLink } from '@/components/link';
import { MessageContainer } from '@/components/message-container';
import { NavigationActions } from '@/components/navigation-actions';
import { CORGI_IMAGES, ESTIMATION_HOURS } from '@/constants';
import { siteDescription } from '@/site';
import { getRandomIndex } from '@/util';

const getSearchParamValue = (value?: string | string[]) =>
	Array.isArray(value) ? value[0] : value;

const getIndexFromSearchParam = (value?: string | string[]) => {
	const normalizedValue = getSearchParamValue(value);

	if (normalizedValue === undefined) {
		return undefined;
	}

	const parsedValue = Number.parseInt(normalizedValue, 10);

	return Number.isNaN(parsedValue) ? undefined : parsedValue;
};

export default function Home() {
	const searchParams = new URLSearchParams(globalThis.location.search);
	const imageIndex = getIndexFromSearchParam(searchParams.get('i') ?? undefined);
	const messageIndex = getIndexFromSearchParam(searchParams.get('m') ?? undefined);
	const valueIndex = getIndexFromSearchParam(searchParams.get('v') ?? undefined);

	return (
		<Stack
			sx={{
				alignItems: 'center',
				gap: 'clamp(1rem, 2.2vh, 1.5rem)',
				width: { xs: 'min(100%, 560px)', md: 'min(1040px, 100%)' },
			}}
		>
			<MuiLink
				component={NextLink}
				href="/"
				underline="none"
				color="text.primary"
			>
				<Typography
					component="h1"
					sx={{
						fontSize: 'clamp(2rem, 2.5vw, 2.8rem)',
						fontWeight: 700,
						lineHeight: 1,
						letterSpacing: '-0.055em',
						textAlign: 'center',
					}}
				>
					estimation corgi
				</Typography>
			</MuiLink>
			<Typography
				component="p"
				variant="body2"
				color="text.secondary"
				sx={{
					maxWidth: '36rem',
					mt: -0.75,
					lineHeight: 1.45,
					textAlign: 'center',
				}}
			>
				{siteDescription}
			</Typography>
			<MessageContainer
				initialEstimateState={{
					imageIndex: imageIndex ?? getRandomIndex(CORGI_IMAGES.length),
					messageIndex: messageIndex ?? -1,
					valueIndex: valueIndex ?? getRandomIndex(ESTIMATION_HOURS.length),
				}}
			/>
			<NavigationActions />
		</Stack>
	);
}

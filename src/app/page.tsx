import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { preloadedQueryResult, preloadQuery } from 'convex/nextjs';
import { Link as NextLink } from '@/components/link';
import { MessageContainer } from '@/components/message-container';
import { NavigationActions } from '@/components/navigation-actions';
import { CORGI_IMAGES, ESTIMATION_HOURS } from '@/constants';
import { siteDescription } from '@/site';
import { getRandomIndex } from '@/util';
import { api } from '../../convex/_generated/api';

interface HomeProps {
	searchParams: Promise<{
		i?: string | string[];
		m?: string | string[];
		v?: string | string[];
	}>;
}

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

export default async function Home({ searchParams }: Readonly<HomeProps>) {
	const params = await searchParams;
	const preloadedMessages = await preloadQuery(
		api.messages.getApprovedMessages,
	);
	const approvedMessages = preloadedQueryResult(preloadedMessages);
	const imageIndex = getIndexFromSearchParam(params.i);
	const messageIndex = getIndexFromSearchParam(params.m);
	const valueIndex = getIndexFromSearchParam(params.v);

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
				approvedMessages={preloadedMessages}
				initialEstimateState={{
					imageIndex: imageIndex ?? getRandomIndex(CORGI_IMAGES.length),
					messageIndex: messageIndex ?? getRandomIndex(approvedMessages.length),
					valueIndex: valueIndex ?? getRandomIndex(ESTIMATION_HOURS.length),
				}}
			/>
			<NavigationActions />
		</Stack>
	);
}

import { Link } from '@/components/link';
import { MessageContainer } from '@/components/message-container';
import { NavigationActions } from '@/components/navigation-actions';
import { ThemeToggle } from '@/components/theme-toggle';
import { CORGI_IMAGES, ESTIMATION_HOURS } from '@/constants';
import { getRandomIndex } from '@/util';

const getIndexFromSearchParam = (value: string | null) => {
	if (value === null) return undefined;
	const parsedValue = Number.parseInt(value, 10);
	return Number.isNaN(parsedValue) ? undefined : parsedValue;
};

export default function Home() {
	const searchParams = new URLSearchParams(globalThis.location.search);
	const imageIndex = getIndexFromSearchParam(searchParams.get('i'));
	const messageId = searchParams.get('m');
	const valueIndex = getIndexFromSearchParam(searchParams.get('v'));

	return (
		<div className="home-page">
			<header className="site-header">
				<Link href="/" className="wordmark" aria-label="estimation corgi home">
					<span className="wordmark-icon" aria-hidden="true">
						✳
					</span>
					<span>
						estimation
						<br />
						corgi<span className="wordmark-period">.</span>
					</span>
				</Link>
				<div className="header-right">
					<span className="header-status">
						<span className="status-dot" /> ONLINE &amp; GUESSING
					</span>
					<Link href="/suggest" className="header-link">
						Submit a hot take <span aria-hidden="true">↗</span>
					</Link>
					<ThemeToggle />
				</div>
			</header>

			<section className="hero-intro" aria-labelledby="hero-title">
				<div className="eyebrow">
					<span className="eyebrow-line" /> THE INTERNET'S LEAST QUALIFIED
					PROJECT MANAGER <span className="eyebrow-line" />
				</div>
				<h1 id="hero-title">
					Big estimates.
					<br />
					<em>Little legs.</em>
				</h1>
				<p>
					Hand your deadline to a corgi with absolutely no context and an
					unreasonable amount of confidence.
				</p>
			</section>

			<MessageContainer
				initialEstimateState={{
					imageIndex: imageIndex ?? getRandomIndex(CORGI_IMAGES.length),
					messageId,
					valueIndex: valueIndex ?? getRandomIndex(ESTIMATION_HOURS.length),
				}}
			/>

			<NavigationActions />
		</div>
	);
}

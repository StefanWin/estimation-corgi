import { Link } from '@/components/link';

export function NavigationActions() {
	return (
		<section className="below-ticket" aria-label="More about estimation corgi">
			<div>
				<span className="section-kicker">HAVE OPINIONS? EXCELLENT.</span>
				<h2>
					This dog takes
					<br />
					<em>requests.</em>
				</h2>
			</div>
			<div className="below-ticket-links">
				<Link href="/suggest">
					Suggest a message <span aria-hidden="true">↗</span>
				</Link>
				<Link href="/meta">
					Meet the whole crew <span aria-hidden="true">↗</span>
				</Link>
			</div>
		</section>
	);
}

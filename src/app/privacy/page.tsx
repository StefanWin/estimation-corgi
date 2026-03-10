import type { Metadata } from 'next';
import { Link as NextLink } from '@/components/link';
import s from './privacy.module.css';

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description: 'Privacy Policy for estimation-corgi.com',
};

export default function PrivacyPage() {
	return (
		<main className={s.container}>
			<div>
				<h1>Privacy Policy</h1>
				<p>
					<em>Last updated: March 2026</em>
				</p>

				<section>
					<h2>1. Controller</h2>
					<p>
						<strong>Name:</strong> Stefan Wintergerst
						<br />
						<strong>Email:</strong> wintergerst.stefan@googlemail.com
						<br />
						<strong>Website:</strong> estimation-corgi.com
					</p>
				</section>

				<section>
					<h2>2. Hosting (Vercel)</h2>
					<p>
						This website is hosted by Vercel Inc., 340 S Lemon Ave #4133,
						Walnut, CA 91789, USA. Vercel processes server log data (IP address,
						browser type, and time of access) to ensure secure and reliable
						operation.
					</p>
					<p>
						<strong>Legal basis:</strong> Article 6(1)(f) GDPR (legitimate
						interest in reliable and secure website delivery).
						<br />
						<strong>Data transfer:</strong> Data may be transferred to the USA.
						Vercel participates in the EU–US Data Privacy Framework.
					</p>
				</section>

				<section>
					<h2>3. Analytics (PostHog)</h2>
					<p>
						This website uses PostHog to understand how visitors use the site
						and to measure interactions with core features. This helps us
						improve functionality, content, and overall user experience.
						Analytics are only enabled after you give your consent.
					</p>
					<p>
						<strong>Data collected:</strong> PostHog may collect page views,
						referrer URL, browser and device information, approximate location,
						timestamps, and event data generated when you interact with the
						website, such as requesting a new message or suggesting a message.
						If an error occurs while submitting a suggestion, technical error
						details and the form values involved in that failed submission may
						also be sent to PostHog for debugging purposes.
					</p>
					<p>
						<strong>Storage and identifiers:</strong> PostHog may use cookies or
						similar browser storage to recognize returning browsers and
						associate events with a session. We do not use PostHog to directly
						identify you by name.
					</p>
					<p>
						<strong>Retention period:</strong> Analytics data is retained only
						as long as necessary for analytics and debugging purposes or until
						it is deleted in PostHog.
					</p>
					<p>
						<strong>Provider:</strong> PostHog. This website is configured to
						send analytics data to PostHog&apos;s EU ingestion endpoint at{' '}
						<a
							href="https://eu.i.posthog.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							eu.i.posthog.com
						</a>
						<br />
						<strong>Legal basis:</strong> Article 6(1)(a) GDPR (your consent).
						You can give or refuse consent through the cookie banner and change
						your choice later via cookie settings.
						<br />
						<strong>Data transfer:</strong> Although the data is sent to a
						PostHog EU endpoint, processing by PostHog may involve international
						data transfers depending on PostHog&apos;s infrastructure and
						support arrangements.
						<br />
						<strong>Your rights:</strong> You can object to analytics processing
						at any time by withdrawing your consent in cookie settings or by
						contacting us.
						<br />
						<strong>More information:</strong>{' '}
						<a
							href="https://posthog.com/privacy"
							target="_blank"
							rel="noopener noreferrer"
						>
							PostHog Privacy Policy
						</a>
					</p>
				</section>

				<section>
					<h2>4. Cookies</h2>
					<p>
						This website may use cookies and similar browser storage for
						essential functionality and for PostHog analytics described in
						Section 3. You can delete or block cookies through your browser
						settings at any time and manage analytics consent through cookie
						settings.
					</p>
					<p>
						<strong>Legal basis:</strong> Essential cookies – Art. 6(1)(f) GDPR.
						Analytics-related storage is based on your consent under Art.
						6(1)(a) GDPR as described in Section 3.
					</p>
				</section>

				<section>
					<h2>5. Your Rights Under GDPR</h2>
					<p>Under the GDPR, you have the following rights:</p>
					<ul>
						<li>
							<strong>Right of access (Art. 15 GDPR):</strong> Request
							information about your personal data we process.
						</li>
						<li>
							<strong>Right to rectification (Art. 16 GDPR):</strong> Request
							correction of inaccurate personal data.
						</li>
						<li>
							<strong>Right to erasure (Art. 17 GDPR):</strong> Request deletion
							of your personal data under certain conditions.
						</li>
						<li>
							<strong>Right to restriction (Art. 18 GDPR):</strong> Request
							restriction of processing under certain conditions.
						</li>
						<li>
							<strong>Right to data portability (Art. 20 GDPR):</strong> Receive
							your personal data in a structured, machine-readable format.
						</li>
						<li>
							<strong>Right to object (Art. 21 GDPR):</strong> Object to
							processing based on legitimate interests at any time.
						</li>
						<li>
							<strong>Right to withdraw consent (Art. 7(3) GDPR):</strong> Where
							processing is based on consent, you may withdraw it at any time.
						</li>
						<li>
							<strong>Right to lodge a complaint (Art. 77 GDPR):</strong> File a
							complaint with your local data protection authority, such as the{' '}
							<em>
								Landesbeauftragte für Datenschutz und Informationsfreiheit
							</em>
							{''}.
						</li>
					</ul>
					<p>
						To exercise your rights, please contact us at{' '}
						<a href="mailto:wintergerst.stefan@googlemail.com">
							wintergerst.stefan@googlemail.com
						</a>
						{''}.
					</p>
					<p>
						<strong>Note:</strong> PostHog analytics data is generally stored in
						pseudonymous event form rather than as directly identifying profile
						data. If you want to exercise rights related to analytics data,
						please contact us and include any details that may help us locate
						the relevant records.
					</p>
				</section>

				<section>
					<h2>6. Updates</h2>
					<p>
						This policy may be updated to reflect legal or technical changes.
						Please review this page periodically for the latest version.
					</p>
				</section>
			</div>
			<NextLink href="/" className={s.backLink}>
				go back
			</NextLink>
		</main>
	);
}

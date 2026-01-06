import type { Metadata } from 'next';
import NextLink from 'next/link';
import s from './privacy.module.css';

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description:
		'Privacy Policy for estimation-corgi.com, estimation-corgi.swinte.dev',
};

export default function PrivacyPage() {
	return (
		<main className={s.container}>
			<div>
				<h1>Privacy Policy</h1>
				<p>
					<em>Last updated: January 2026</em>
				</p>

				<section>
					<h2>1. Controller</h2>
					<p>
						<strong>Name:</strong> Stefan Wintergerst
						<br />
						<strong>Email:</strong> wintergerst.stefan@googlemail.com
						<br />
						<strong>Website:</strong> estimation-corgi.com,
						estimation-corgi.swinte.dev
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
					<h2>3. Analytics (Vercel Analytics)</h2>
					<p>
						This website uses Vercel Analytics to collect anonymous usage data
						such as page views, referrer information, and basic browser
						information. This helps us understand how visitors use the site and
						improve user experience.
					</p>
					<p>
						<strong>Data collected:</strong> Page views, referrer URL, browser
						type, device type, country (derived from IP address, which is not
						stored), and visit timestamp.
					</p>
					<p>
						<strong>Privacy features:</strong> Vercel Analytics is
						privacy-friendly and does not use cookies, does not track users
						across sites, and does not collect personally identifiable
						information. All data is anonymized and aggregated.
					</p>
					<p>
						<strong>Retention period:</strong> Analytics data is retained for a
						maximum of 12 months.
					</p>
					<p>
						<strong>Provider:</strong> Vercel Inc., 340 S Lemon Ave #4133,
						Walnut, CA 91789, USA
						<br />
						<strong>Legal basis:</strong> Article 6(1)(f) GDPR (legitimate
						interest in analyzing and improving website usage). Our legitimate
						interest is to understand how visitors use our website to improve
						functionality and user experience. This processing does not override
						your fundamental rights as the data is fully anonymized.
						<br />
						<strong>Data transfer:</strong> Data may be transferred to and
						processed in the USA. Vercel participates in the EU–US Data Privacy
						Framework and provides appropriate safeguards for international data
						transfers under Article 46 GDPR.
						<br />
						<strong>Your rights:</strong> You can object to analytics processing
						at any time by contacting us. Since the data is fully anonymized,
						individual data cannot be identified or deleted.
						<br />
						<strong>More information:</strong>{' '}
						<a
							href="https://vercel.com/docs/analytics/privacy-policy"
							target="_blank"
							rel="noopener noreferrer"
						>
							Vercel Analytics Privacy Policy
						</a>
					</p>
				</section>

				<section>
					<h2>4. Cookies</h2>
					<p>
						Cookies may be used for essential functionality. You can delete or
						block cookies through your browser settings at any time.
					</p>
					<p>
						<strong>Legal basis:</strong> Essential cookies – Art. 6(1)(f) GDPR.
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
							<em>Landesbeauftragte für Datenschutz und Informationsfreiheit</em>
							.
						</li>
					</ul>
					<p>
						To exercise your rights, please contact us at{' '}
						<a href="mailto:wintergerst.stefan@googlemail.com">
							wintergerst.stefan@googlemail.com
						</a>
						.
					</p>
					<p>
						<strong>Note:</strong> For Vercel Analytics data, since all
						information is fully anonymized and aggregated, it cannot be linked
						to individual users. Therefore, rights such as access, deletion, and
						portability do not apply to this anonymized data.
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
			<NextLink href="/">go back</NextLink>
		</main>
	);
}

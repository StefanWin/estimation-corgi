import type { Metadata } from 'next';
import NextLink from 'next/link';
import s from './privacy.module.css';

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description: 'Privacy Policy for swinte.dev',
};

export default function PrivacyPage() {
	return (
		<main className={s.container}>
			<div>
				<h1>Privacy Policy</h1>

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
					<h2>3. Analytics (PostHog)</h2>
					<p>
						This website uses PostHog, operated by PostHog Inc., 965 Mission
						Street, San Francisco, CA 94103, USA, with EU data hosting in
						Frankfurt, Germany.
					</p>
					<p>
						Data is processed anonymously to analyze visitor interactions and
						improve the site. No personal tracking or cross‑site profiling
						occurs without explicit consent.
					</p>
					<p>
						<strong>Legal basis:</strong> Article 6(1)(a) GDPR (consent).
						<br />
						<strong>Data storage:</strong> EU region (Frankfurt) PostHog Cloud.
					</p>
				</section>

				<section>
					<h2>4. Cookies</h2>
					<p>
						Cookies are used for essential functionality and analytics if you
						consent. You can delete or block cookies through your browser
						settings at any time.
					</p>
					<p>
						<strong>Legal basis:</strong> Essential cookies – Art. 6(1)(f) GDPR;
						Analytics cookies – Art. 6(1)(a) GDPR.
					</p>
				</section>

				<section>
					<h2>5. Your Rights</h2>
					<p>
						You have the right to request access, correction, deletion,
						restriction of processing, data portability, and to object to
						processing under Articles 15–21 GDPR. You may also file a complaint
						with your local data protection authority, such as the{' '}
						<em>Landesbeauftragte für Datenschutz und Informationsfreiheit</em>{' '}
						in your federal state.
					</p>
				</section>

				<section>
					<h2>6. Updates</h2>
					<p>
						This policy may be updated to reflect legal or technical changes.
						Please review this page periodically for the latest version.
					</p>
				</section>
				<NextLink className="underlinetransition-colors" href="/">
					go back
				</NextLink>
			</div>
		</main>
	);
}

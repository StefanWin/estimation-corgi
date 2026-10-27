import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import { Link as NextLink } from '@/components/link';

export default function PrivacyPage() {
	return (
		<Box
			component="main"
			className="secondary-page"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				py: 2,
				maxWidth: 700,
				width: '100%',
				lineHeight: 1.7,
				'& h1': {
					fontSize: '1.75rem',
					fontWeight: 700,
					mb: 3,
					color: 'var(--ink)',
				},
				'& h2': {
					fontSize: '1.2rem',
					fontWeight: 600,
					mt: 3,
					mb: 1.5,
					pt: 3,
					color: 'primary.main',
					borderTop: '1px solid var(--line)',
				},
				'& p': { mb: 2, opacity: 0.9 },
				'& a': {
					color: 'var(--accent-deep)',
					textDecoration: 'none',
					'&:hover': { color: 'var(--accent)', textDecoration: 'underline' },
				},
			}}
		>
			<div>
				<h1>Privacy Policy</h1>
				<p>
					<em>Last updated: October 2026</em>
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
					<h2>2. Hosting (Cloudflare)</h2>
					<p>
						This website is hosted by Cloudflare, Inc. Cloudflare processes
						server log data, such as IP address, browser type, and time of
						access, to ensure secure and reliable operation.
					</p>
					<p>
						<strong>Request logs:</strong> We use Cloudflare Workers Logs to
						monitor errors and performance. For requests to the home page and to
						estimate preview images, these logs contain the full address that
						was requested. For shared estimate links, that includes the estimate
						and any task text entered for it. The logs are kept only for a
						limited period set by Cloudflare.
					</p>
					<p>
						<strong>Legal basis:</strong> Article 6(1)(f) GDPR (legitimate
						interest in reliable and secure website delivery).
						<br />
						<strong>Data transfer:</strong> Data may be transferred to the USA.
						Cloudflare may process this data as part of providing hosting
						services.
					</p>
				</section>

				<section>
					<h2>3. Cookies</h2>
					<p>
						This website uses no analytics or tracking. It may use cookies and
						similar browser storage only for essential functionality. You can
						delete or block cookies through your browser settings at any time.
					</p>
					<p>
						<strong>Likes:</strong> The first time you like a message, a random
						identifier is created and kept in your browser's local storage. It
						is sent with your likes and stored with them so that each browser
						can like a message only once. It contains no personal information
						and is not used for analytics. Clearing your browser storage removes
						it.
					</p>
					<p>
						<strong>Legal basis:</strong> Essential cookies – Art. 6(1)(f) GDPR.
					</p>
				</section>

				<section>
					<h2>4. Your Rights Under GDPR</h2>
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
				</section>

				<section>
					<h2>5. Updates</h2>
					<p>
						This policy may be updated to reflect legal or technical changes.
						Please review this page periodically for the latest version.
					</p>
				</section>
			</div>
			<MuiLink
				component={NextLink}
				href="/"
				sx={{
					mt: 4,
					py: 1,
					borderBottom: '1px solid var(--line)',
					color: 'primary.light',
					fontWeight: 700,
					textDecoration: 'none',
					'&:hover': {
						color: 'var(--accent)',
						borderColor: 'var(--accent)',
						textDecoration: 'none',
					},
				}}
			>
				go back
			</MuiLink>
		</Box>
	);
}

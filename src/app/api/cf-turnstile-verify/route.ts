import { z } from 'zod';
import { env } from '@/env';

const inputSchema = z.object({ token: z.string() });

const cfResponseSchema = z.object({
	action: z.string().optional(),
	cdata: z.string().optional(),
	challenge_ts: z.string().optional(),
	hostname: z.string().optional(),
	messages: z.array(z.string()).optional(),
	success: z.boolean(),
	// metadata: z.object({interactive: z.boolean()}).optional(),
	'error-codes': z.array(
		z.enum([
			'missing-input-secret',
			'invalid-input-secret',
			'missing-input-response',
			'invalid-input-response',
			'invalid-widget-id',
			'invalid-parsed-secret',
			'bad-request',
			'timeout-or-duplicate',
			'internal-error',
		]),
	),
});

export async function POST(request: Request) {
	const { CF_TURNSTILE_VERIFY_ENDPOINT, TURNSTILE_SECRET_KEY } = env;

	if (!TURNSTILE_SECRET_KEY) {
		return new Response('turnstile secret key not set', {
			status: 500,
		});
	}

	const input = await request.json();

	const { error, data: parsedInputData } = inputSchema.safeParse(input);

	if (error) {
		return new Response(JSON.stringify(error), {
			status: 400,
			headers: {
				'content-type': 'application/json',
			},
		});
	}

	const { token } = parsedInputData;

	const res = await fetch(CF_TURNSTILE_VERIFY_ENDPOINT, {
		method: 'POST',
		body: `secret=${encodeURIComponent(TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(token)}`,
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	});

	const responseData = await res.json();
	const { error: cfError, data: parsedResponseData } =
		cfResponseSchema.safeParse(responseData);

	if (cfError) {
		console.error(cfError);
		return new Response('turnstile verification yielded invalid response', {
			status: 500,
		});
	}

	return new Response(JSON.stringify(parsedResponseData), {
		status: parsedResponseData.success ? 200 : 400,
		headers: {
			'content-type': 'application/json',
		},
	});
}

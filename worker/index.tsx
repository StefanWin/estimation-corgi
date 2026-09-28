import { ImageResponse } from '@cf-wasm/og/workerd';
import { ConvexHttpClient } from 'convex/browser';
import { CORGI_IMAGES } from '@/constants';
import {
	formatHours,
	parseSharedEstimate,
	type SharedEstimate,
} from '@/estimate';
import { siteDescription } from '@/site';
import { api } from '../convex/_generated/api';
import geistSemiBold from './fonts/geist-latin-600-normal.woff?url';
import geistBlack from './fonts/geist-latin-900-normal.woff?url';
import { EstimateCard, OG_IMAGE_SIZE } from './og-image';
import { webpToPng } from './webp-to-png';

const OG_IMAGE_PATH = '/og';
const SITE_NAME = 'estimation corgi';
const DEFAULT_IMAGE_INDEX = Math.max(
	CORGI_IMAGES.findIndex((image) => image.id === 'laptop-corgi'),
	0,
);
// Shared estimates never change, so their images can be cached for good. A
// link we could not resolve (e.g. Convex was unreachable) is retried sooner.
const RESOLVED_CACHE_CONTROL = 'public, max-age=31536000, immutable';
const UNRESOLVED_CACHE_CONTROL = 'public, max-age=300';

const convex = new ConvexHttpClient(import.meta.env.VITE_CONVEX_URL);

interface ResolvedEstimate {
	imageIndex: number;
	message: string;
	task: string;
	valueIndex: number;
}

const resolveEstimate = async (
	shared: SharedEstimate,
): Promise<ResolvedEstimate | null> => {
	const { imageIndex, messageId, task, valueIndex } = shared;
	if (imageIndex === undefined || valueIndex === undefined || !messageId) {
		return null;
	}

	const message = await convex
		.query(api.messages.getApprovedMessage, { id: messageId })
		.catch((error: unknown) => {
			console.error('failed to load shared message', error);
			return null;
		});

	return message ? { imageIndex, message, task, valueIndex } : null;
};

const hasShareParams = (searchParams: URLSearchParams) =>
	['i', 'm', 'v', 't'].some((key) => searchParams.has(key));

const escapeAttribute = (value: string) =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('"', '&quot;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');

const handlePage = async (request: Request, env: Env) => {
	const response = await env.ASSETS.fetch(request);
	if (!response.headers.get('content-type')?.includes('text/html')) {
		return response;
	}

	const url = new URL(request.url);
	const shared = parseSharedEstimate(url.searchParams);
	const estimate = await resolveEstimate(shared);
	const imageUrl = new URL(OG_IMAGE_PATH, url.origin);
	let title = SITE_NAME;
	let description = siteDescription;

	if (estimate && shared.messageId) {
		const hours = formatHours(estimate.valueIndex);
		imageUrl.searchParams.set('i', String(estimate.imageIndex));
		imageUrl.searchParams.set('m', shared.messageId);
		imageUrl.searchParams.set('v', String(estimate.valueIndex));
		if (estimate.task) {
			imageUrl.searchParams.set('t', estimate.task);
		}
		title = estimate.task ? `${estimate.task}: ${hours}` : hours;
		description = estimate.message;
	}

	const tags: Record<string, string> = {
		'og:type': 'website',
		'og:site_name': SITE_NAME,
		'og:title': title,
		'og:description': description,
		'og:url': url.href,
		'og:image': imageUrl.href,
		'og:image:width': String(OG_IMAGE_SIZE.width),
		'og:image:height': String(OG_IMAGE_SIZE.height),
		'og:image:alt': estimate
			? `A corgi confidently estimating ${title}`
			: 'A corgi giving a wildly confident estimate',
	};

	return new HTMLRewriter()
		.on('head', {
			element(head) {
				for (const [property, content] of Object.entries(tags)) {
					head.append(
						`<meta property="${property}" content="${escapeAttribute(content)}" />`,
						{ html: true },
					);
				}
			},
		})
		.transform(response);
};

const loadAsset = async (env: Env, origin: string, path: string) => {
	const response = await env.ASSETS.fetch(new URL(path, origin));
	// A missing asset falls back to the SPA's index.html with a 200.
	if (
		!response.ok ||
		response.headers.get('content-type')?.includes('text/html')
	) {
		throw new Error(`failed to load asset ${path}: ${response.status}`);
	}
	return response.arrayBuffer();
};

const toDataUri = (buffer: ArrayBuffer, type: string) => {
	const bytes = new Uint8Array(buffer);
	let binary = '';
	for (let offset = 0; offset < bytes.length; offset += 0x8000) {
		binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
	}
	return `data:${type};base64,${btoa(binary)}`;
};

const handleImage = async (
	request: Request,
	env: Env,
	ctx: ExecutionContext,
) => {
	// The shared tsconfig's DOM lib types `caches` without the Workers-only
	// default cache.
	const cache = (caches as CacheStorage & { default: Cache }).default;
	const cached = await cache.match(request);
	if (cached) {
		return cached;
	}

	const url = new URL(request.url);
	const estimate = await resolveEstimate(parseSharedEstimate(url.searchParams));
	const image = CORGI_IMAGES[estimate?.imageIndex ?? DEFAULT_IMAGE_INDEX];
	const [portrait, semiBold, black] = await Promise.all([
		loadAsset(env, url.origin, image.src).then(webpToPng),
		loadAsset(env, url.origin, geistSemiBold),
		loadAsset(env, url.origin, geistBlack),
	]);

	const isResolved = estimate !== null || !hasShareParams(url.searchParams);
	const response = await ImageResponse.async(
		<EstimateCard
			imageSrc={toDataUri(portrait, 'image/png')}
			hours={estimate ? formatHours(estimate.valueIndex) : '?? hours'}
			number={estimate ? estimate.valueIndex + 1 : 0}
			task={estimate?.task ?? ''}
			message={estimate?.message ?? 'Big estimates. Little legs.'}
		/>,
		{
			...OG_IMAGE_SIZE,
			fonts: [
				{ name: 'Geist', data: semiBold, weight: 600, style: 'normal' },
				{ name: 'Geist', data: black, weight: 900, style: 'normal' },
			],
			headers: {
				'cache-control': isResolved
					? RESOLVED_CACHE_CONTROL
					: UNRESOLVED_CACHE_CONTROL,
			},
		},
	);

	ctx.waitUntil(cache.put(request, response.clone()));
	return response;
};

export default {
	async fetch(request, env, ctx) {
		const { pathname } = new URL(request.url);

		if (pathname === OG_IMAGE_PATH) {
			try {
				return await handleImage(request, env, ctx);
			} catch (error: unknown) {
				console.error('failed to render estimate image', error);
				return new Response('failed to render image', { status: 500 });
			}
		}

		if (pathname === '/') {
			return handlePage(request, env);
		}

		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;

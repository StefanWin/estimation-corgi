import pngEncodeWasm from '@jsquash/png/codec/pkg/squoosh_png_bg.wasm?module';
import encodePng, { init as initPngEncode } from '@jsquash/png/encode';
import webpDecodeWasm from '@jsquash/webp/codec/dec/webp_dec.wasm?module';
import decodeWebp, { init as initWebpDecode } from '@jsquash/webp/decode';

// Workers can't compile wasm from fetched bytes, so the codecs get the
// modules bundled at build time instead of loading their own.
let codecs: Promise<unknown> | undefined;

const initCodecs = () => {
	codecs ??= Promise.all([
		initWebpDecode(webpDecodeWasm),
		initPngEncode(pngEncodeWasm),
	]);
	return codecs;
};

/** resvg can't decode WebP, so the corgi portraits are converted first. */
export const webpToPng = async (webp: ArrayBuffer) => {
	await initCodecs();
	return encodePng(await decodeWebp(webp));
};

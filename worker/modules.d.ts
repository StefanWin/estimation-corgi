// The Cloudflare Vite plugin compiles `.wasm?module` imports into modules.
declare module '*.wasm?module' {
	const module: WebAssembly.Module;
	export default module;
}

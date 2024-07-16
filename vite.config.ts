import { configDefaults, defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		environment: 'jsdom', // we're making a web app, so we want a web-like environment
		globals: true, // avoid having to import things like "describe" and "expect"
		include: ['./src/**/*.{test,spec}.{js,ts}'],
		setupFiles: ['./test/test-setup.ts'],
		reporters: ['default', 'junit'],
		outputFile: 'junit.xml',
		css: false,
		coverage: {
			all: true,
			include: ['src/**/*.{js,ts,svelte}'],
			exclude: [
				...(configDefaults.coverage.exclude as string[]),
				'**/types.ts', // No code to test
				'**/index.{js,ts}', // No code to test
				'**/icons/**', // these are svgs/visual - not really testable
				'**/routes/**', // tested via e2e
				'**/lib/components/views/**', // tested via e2e
				'**/lib/components/layout/nav/**' // tested via e2e
			],
			reporter: ['text', 'cobertura']
		}
	},
	build: {
		target: 'es2021',
		commonjsOptions: {
			strictRequires: true
		},
		chunkSizeWarningLimit: 2000
	},
	optimizeDeps: {
		// These do not appear to be compatible with the dependency optimizer.
		exclude: ['@ukic/web-components']
	}
});
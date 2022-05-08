#!/usr/bin/env node

const watchFlag = process.argv.indexOf('--watch') > -1;

require('esbuild')
	.build({
		entryPoints: ['src/ts/main.ts'],
		bundle: true,
		outfile: 'public/generated/main.js',
		watch: watchFlag,
	})
	.catch(() => process.exit(1));

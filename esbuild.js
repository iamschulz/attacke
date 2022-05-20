#!/usr/bin/env node

const watchFlag = process.argv.indexOf("--watch") > -1;

require("esbuild")
	.build({
		entryPoints: ["src/ts/main.ts", "src/ts/sw.ts"],
		bundle: true,
		outdir: "public",
		watch: watchFlag,
	})
	.catch(() => process.exit(1));

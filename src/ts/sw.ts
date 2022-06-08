/// <reference lib="webworker" />
import { getGameAssets } from "./getGameAssets";

const version = "0.0.5";
const cacheName = `attacke-${version}`;
const channel = new BroadcastChannel("sw-messages");

const cacheAssets = () => {
	const assets = [
		"/",
		"/index.html",
		"/styles.css",
		"/main.js",
		"/manifest.json",
		"/assets/PressStart2P.woff2",
		"/assets/favicon.svg",
		...getGameAssets(),
	];

	caches.open(cacheName).then(function (cache) {
		cache.addAll(assets);
	});
};

self.addEventListener("fetch", (event) => {
	event.respondWith(
		(async () => {
			return (await caches.match(event.request)) || fetch(event.request);
		})()
	);
});

channel.addEventListener("message", (event) => {
	switch (event.data.message) {
		case "cache-assets":
			cacheAssets();
			break;
	}
});

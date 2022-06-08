/// <reference lib="webworker" />
import { getGameAssets } from "./getGameAssets";

const version = "0.0.4";
const cacheName = `attacke-${version}`;
const channel = new BroadcastChannel("sw-messages");

const cacheAssets = () => {
	const assets = [
		"/",
		"/index.html",
		"/credits.html",
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
			const cacheResponse = await caches.match(event.request);
			if (cacheResponse) {
				return cacheResponse;
			}
			const response = await fetch(event.request);
			const cache = await caches.open(cacheName);
			cache.put(event.request, response.clone());
			console.log("additional caching", event.request.url);
			return response;
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

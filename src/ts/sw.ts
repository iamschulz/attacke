/// <reference lib="webworker" />
import { getGameAssets } from "./getGameAssets";

const version = "0.0.3-dev";
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

self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.open(cacheName).then(function (cache) {
			return cache.match(event.request).then(function (response) {
				return (
					response ||
					fetch(event.request).then(function (response) {
						return response;
					})
				);
			});
		})
	);
});

channel.addEventListener("message", (event) => {
	switch (event.data.message) {
		case "cache-assets":
			cacheAssets();
			break;
	}
});

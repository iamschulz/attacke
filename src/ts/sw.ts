/// <reference lib="webworker" />
import { getGameAssets } from "./getGameAssets";

const version = "0.0.2";
const cacheName = `attacke-${version}`;

const cacheAssets = () => {
	caches.open(cacheName).then(function (cache) {
		const assets = getGameAssets();
		const pageAssets = [
			"/",
			"/sw.js",
			"/index.html",
			"/credits.html",
			"/styles.css",
			"/main.js",
			"assets/PressStart2P.woff2",
		];
		return cache.addAll([...pageAssets, ...assets]);
	});
};

self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.open("mysite-dynamic").then(function (cache) {
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

self.addEventListener("message", function (event) {
	console.log("msg", event);
	if (event.data === "installed") {
		cacheAssets();
	}
});

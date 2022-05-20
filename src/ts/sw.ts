/// <reference lib="webworker" />
import { getGameAssets } from "./getGameAssets";

const version = "0.0.1";
const cacheName = `attacke-${version}`;

self.addEventListener("install", function (event) {
	/*
	event.waitUntil(
		caches.open(cacheName).then(function (cache) {
			const assets = getGameAssets();
			return cache.addAll(["/", "/credits.html", "/styles.css", "/main.js", ...assets]);
		})
	);
    */
});

self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.open("mysite-dynamic").then(function (cache) {
			return cache.match(event.request).then(function (response) {
				return (
					response ||
					fetch(event.request).then(function (response) {
						//cache.put(event.request, response.clone());
						return response;
					})
				);
			});
		})
	);
});

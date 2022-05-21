export const registerServiceWorker =
	async (): Promise<ServiceWorkerRegistration> => {
		if ("serviceWorker" in navigator) {
			return await navigator.serviceWorker.register("/sw.js", {
				scope: "/",
			});
		}
	};

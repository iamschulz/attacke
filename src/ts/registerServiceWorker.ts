export const registerServiceWorker = (): void => {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.register("/sw.js", {
			scope: "/",
		});
	}
};

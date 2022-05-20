import { registerServiceWorker } from "./registerServiceWorker";

export const showInstallButton = () => {
	const button = document.querySelector("[pwa-install-button]");
	if (!button) {
		return;
	}

	let deferredPrompt: Event | null = null;

	window.addEventListener("beforeinstallprompt", (e) => {
		console.log("foo2");
		// Prevent the mini-infobar from appearing on mobile
		e.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = e;
		// Update UI notify the user they can install the PWA
		button.removeAttribute("hidden");
	});

	button.addEventListener("click", (e) => {
		console.log("install");
	});
};

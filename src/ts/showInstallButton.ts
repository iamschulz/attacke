export const showInstallButton = (channel: BroadcastChannel) => {
	const button = document.querySelector("[data-type='pwa-install-button']");
	if (!button) {
		return;
	}

	let deferredPrompt: BeforeInstallPromptEvent | null = null;

	window.addEventListener("beforeinstallprompt", (e: Event) => {
		// Prevent the mini-infobar from appearing on mobile
		e.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = e as BeforeInstallPromptEvent;
		// Update UI notify the user they can install the PWA
		button.removeAttribute("hidden");
	});

	button.addEventListener("click", (e) => {
		deferredPrompt.prompt();
	});

	window.addEventListener("appinstalled", () => {
		button.setAttribute("hidden", "hidden");
		deferredPrompt = null;
		channel.postMessage({ message: "cache-assets" });
		// todo: check for navigator.serviceWorker.controller. if false, try again
	});
};

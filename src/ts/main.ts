import { Audio } from "./audio";
import { Countdown } from "./countdown";
import { Obstacle } from "./obstacle";
import { Character } from "./character";
import { Scene } from "./scene";
import { Renderer } from "./render";
import { Collider2d } from "collider2d";
import { Gui } from "./gui";
import { GamepadAdapter } from "./gamepadAdapter";
import { themes } from "../../public/themes/index";
import { Theme } from "../../public/themes/theme";
import { registerServiceWorker } from "./registerServiceWorker";
import { showInstallButton } from "./showInstallButton";

export class Game {
	ctx: CanvasRenderingContext2D;
	collider: Collider2d;
	obstacles: Obstacle[];
	scene: Scene;
	players: Character[];
	gamepadAdapter: GamepadAdapter;
	countdown: Countdown;
	gui: Gui;
	theme: Theme;
	renderer: Renderer;
	audio: Audio;

	constructor() {
		const canvas = document.getElementById("canvas") as HTMLCanvasElement;
		if (!canvas || !canvas.getContext("2d")) {
			console.error("canvas is missing");
			return;
		}
		this.ctx = canvas.getContext("2d")!;
		this.showLoader();
		this.collider = new Collider2d();
		this.gamepadAdapter = new GamepadAdapter(this.ctx);

        this.initTheme(themes[this.getTheme()]);
		this.manageState();
        this.initThemeControl();
        this.renderer = new Renderer(this.ctx);
		this.start();
	}

	showLoader() {
		const loader = document.querySelector(".loader");
		const progress = loader?.querySelector("progress");
		if (!loader || !progress) {
			this.ctx.canvas.classList.add("fade-in");
			return;
		}

		loader.removeAttribute("hidden");
		this.ctx.canvas.addEventListener("loadingEvent", ((e: LoadingEvent) => {
			progress.value = e.detail.progress;
			if (e.detail.progress === 100) {
				loader.setAttribute("hidden", "true");
				this.ctx.canvas.classList.add("fade-in");
			}
		}) as EventListener);
	}

    getTheme() {
        const themeSelect = document.querySelector('#theme') as HTMLSelectElement;
        return themeSelect.value as keyof typeof themes;
    }

    initThemeControl() {
        const themeSelect = document.querySelector('#theme') as HTMLSelectElement;
        themeSelect.addEventListener('change', () => {
            this.switchTheme(themes[this.getTheme()])
        });
    }

    initTheme(theme: themeConfig) {
        this.theme = new Theme(this.ctx, theme);
        this.obstacles = [];
        this.scene = new Scene(this, this.theme);
        this.audio = new Audio(this.theme);
        this.players = [];
        const player1 = new Character(this, 0, this.theme);
		const player2 = new Character(this, 1, this.theme);
		this.players.push(player1, player2);
        this.countdown = new Countdown(this.ctx, this.theme);
        this.gui = new Gui(this.ctx, this.theme, 2);
    }

    switchTheme(config: themeConfig) {
        const theme = new Theme(this.ctx, config);
        this.theme = theme;
        // todo: go into all components and switch things out: countdown, gui, etc
        this.obstacles = [];
        this.scene.switchTheme(theme);
        this.audio.switchTheme(theme);
        this.players.forEach(player => player.switchTheme(theme));
    }

	manageState() {
		this.ctx.canvas.addEventListener("countdown", ((e: FinishEvent) => {
			if (typeof e.detail?.winner === "number") {
				this.gui.incrementScore(e.detail.winner);
			}

			this.startCountdown(e.detail?.winner);
			this.togglePlayers(false);
		}) as EventListener);

		this.ctx.canvas.addEventListener("play", () => {
			this.togglePlayers(true);
		});
	}

	startCountdown(winner?: number) {
		this.countdown.startTimer(winner);
	}

	togglePlayers(active: boolean) {
		this.players.forEach((player) => {
			player.setActive(active);
		});
	}

	start() {
		const startEvent: FinishEvent = new Event("countdown");
		this.ctx.canvas.dispatchEvent(startEvent);
	}
}

new Game();

if (window.BroadcastChannel) {
	const channel = new BroadcastChannel("sw-messages");
	registerServiceWorker();
	showInstallButton(channel);
}

if (window.matchMedia("(display-mode: fullscreen)").matches) {
	document.querySelectorAll("[data-link='external']").forEach((el) => {
		el.setAttribute("target", "_blank");
		el.setAttribute("rel", "noopener noreferrer");
	});
}

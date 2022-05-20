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

	constructor() {
		const canvas = document.getElementById("canvas") as HTMLCanvasElement;
		this.ctx = canvas.getContext("2d");
		this.collider = new Collider2d();
		this.theme = new Theme(themes.MyNewTheme);
		this.obstacles = [];
		this.scene = new Scene(this, this.theme);
		this.players = [];

		const player1 = new Character(this, 0, this.theme);
		const player2 = new Character(this, 1, this.theme);
		this.players.push(player1, player2);

		this.gamepadAdapter = new GamepadAdapter(this.ctx);

		this.countdown = new Countdown(this.ctx, this.theme);
		this.gui = new Gui(this.ctx, this.theme, 2);

		this.renderer = new Renderer(this.ctx, this.theme);

		this.manageState();
		this.manageAudio();
		this.start();
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

	manageAudio() {
		const audioRange = document.querySelector("#sound") as HTMLInputElement;
		audioRange.addEventListener("input", () => {
			this.theme.setBgmVolume(Number(audioRange.value) || 0);
		});
	}

	start() {
		const startEvent: FinishEvent = new Event("countdown");
		this.ctx.canvas.dispatchEvent(startEvent);
	}
}

new Game();

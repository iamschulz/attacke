import config from "../../config.json" assert { type: "json" };
import { hexToRGB } from "./util";

export class Countdown {
	ctx: CanvasRenderingContext2D;
	interval: number;
	intervalLength: number;
	intervalCount: number;
	count: number;
	flashColor: string;
	flashOpacity: number;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.interval = 0;
		this.intervalLength = 1000;
		this.intervalCount = 3;
		this.count = 0;
		this.flashColor = "#ff4d4d";
		this.flashOpacity = 1;

		this.ctx.canvas.addEventListener("tick", () => {
			this.draw();
		});
	}

	startTimer(winner?: number) {
		this.count = this.intervalCount;
		this.flashOpacity = 1;

		this.flashColor =
			typeof winner === "number"
				? config.theme.player[winner] || "#ff4d4d"
				: "#ff4d4d";

		this.interval = window.setInterval(() => {
			if (this.count > 1) {
				this.count--;
			} else {
				this.stopTimer();
			}
		}, this.intervalLength);
	}

	stopTimer() {
		window.clearInterval(this.interval);
		this.interval = 0;
		this.ctx.canvas.dispatchEvent(new Event("play"));
	}

	draw() {
		if (this.count <= 0 || this.interval === 0) {
			return;
		}

		this.ctx.save();
		const flashRgb = hexToRGB(this.flashColor);
		this.ctx.fillStyle = `rgba(${flashRgb.r},${flashRgb.g},${flashRgb.b},${this.flashOpacity})`;
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

		this.ctx.fillStyle = "#ff4d4d";
		this.ctx.shadowColor = "#ff4d4d";
		this.ctx.shadowBlur = 20;
		this.ctx.font = `${this.ctx.canvas.height / 1.5}px PressStart2P`;
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillText(
			this.count.toString(),
			this.ctx.canvas.width / 2,
			this.ctx.canvas.height / 2 + 100
		);
		this.ctx.restore();

		this.flashOpacity = Math.max(this.flashOpacity - 0.01, 0);
	}
}

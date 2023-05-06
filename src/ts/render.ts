import { clamp } from "./util";

export class Renderer {
	ctx: CanvasRenderingContext2D;
	fps: number;
	ticker: number;
	counter: number;
	oldTimeStamp: number = 0;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.fps = 60; // aim for 60fps
		this.counter = 0;
		this.initTicker();
	}

	private initTicker() {
		window.requestAnimationFrame(() => {
			this.tick();
			this.initTicker();
		});
	}

	private tick() {
		const timeStamp = performance.now();
		const secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
		this.oldTimeStamp = timeStamp;

		// Calculate fps
		const fps = Math.round(1 / secondsPassed);
		const frameSkip = clamp(Math.round((60 - fps) / fps), 0, 30);

		// to allow for animations lasting 1s
		if (this.counter >= this.fps * 2) {
			this.counter = 0;
		}

		const tick: TickEvent = new CustomEvent("tick", {
			bubbles: true,
			cancelable: true,
			composed: false,
			detail: {
				frameCount: this.counter,
				frameSkip: frameSkip,
			},
		});
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ctx.canvas.dispatchEvent(tick);

		this.counter++;
	}
}

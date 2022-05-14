import { Theme } from "../../public/themes/theme";

export class Renderer {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	ticker: number;
	counter: number;

	constructor(ctx: CanvasRenderingContext2D, theme: Theme) {
		this.ctx = ctx;
		this.theme = theme;
		this.counter = 0;
		this.initTicker();
	}

	private initTicker() {
		this.ticker = setInterval(() => {
			if (this.counter >= this.theme.config.animationSpeed) {
				this.counter = 0;
				this.theme.updateFrames();
			}

			const tick = new Event("tick", {
				bubbles: true,
				cancelable: true,
				composed: false,
			});
			this.ctx.canvas.dispatchEvent(tick);

			this.counter++;
		}, 1000 / 60); // aim for 60fps
		// todo: maybe switch to requestanimationframe to mitigate lags?
	}
}

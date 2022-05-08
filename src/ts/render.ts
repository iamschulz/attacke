export class Renderer {
	ctx: CanvasRenderingContext2D;
	ticker: number;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.ticker = setInterval(() => {
			const tick = new Event('tick', {
				bubbles: true,
				cancelable: true,
				composed: false,
			});
			ctx.canvas.dispatchEvent(tick);
		}, 1000 / 60); // aim for 60fps
		// todo: maybe switch to requestanimationframe to mitigate lags?
	}
}

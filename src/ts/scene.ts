export class Scene {
	private ctx: CanvasRenderingContext2D;
	private width: number;
	private height: number;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.width = ctx.canvas.width;
		this.height = ctx.canvas.height;

		ctx.canvas.addEventListener("tick", () => {
			this.draw();
		});
	}

	private draw() {
		this.ctx.fillStyle = "#0c071c";
		this.ctx.fillRect(0, 0, this.width, this.height);
	}
}
